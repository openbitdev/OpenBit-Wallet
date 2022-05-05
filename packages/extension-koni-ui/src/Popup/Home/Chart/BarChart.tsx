// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BarTooltipProps, LegendLabelDatum, ResponsiveBar } from '@nivo/bar';
import { BarCustomLayerProps } from '@nivo/bar/dist/types/types';
import { Theme as ChartTheme } from '@nivo/core';
import { SymbolProps } from '@nivo/legends/dist/types/svg/symbols/types';
import BigN from 'bignumber.js';
import CN from 'classnames';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Theme, ThemeProps } from '@polkadot/extension-koni-ui/types';
import { CHART_COLOR_SCHEMA } from '@polkadot/extension-koni-ui/util';
import { BalanceInfo } from '@polkadot/extension-koni-ui/util/types';

interface Props extends ThemeProps{
  className?: string;
  networkKeys: string[];
  networkBalanceMaps: Record<string, BalanceInfo>;
}

interface Datum {
  [key: string]: number;
}

const getTheme = (theme: Theme): ChartTheme => {
  return {
    background: theme.background,
    textColor: theme.textColor2,
    fontSize: 13,
    axis: {
      ticks: {
        line: {
          stroke: theme.textColor2,
          strokeWidth: 1
        },
        text: {
          fontSize: 13,
          fill: theme.textColor2
        }
      }
    },
    crosshair: {
      line: {
        stroke: theme.boxBorderColor
      }
    },
    grid: {
      line: {
        stroke: theme.boxBorderColor,
        strokeWidth: 1
      }
    },
    tooltip: {
      container: {
        background: '#ffffff',
        color: '#333333',
        fontSize: 12
      }
    },
    legends: {
      text: {
        color: theme.textColor2
      }
    }
  };
};

const BarChart = (props: Props) => {
  const { className, networkBalanceMaps } = props;
  const theme = useContext(ThemeContext as React.Context<Theme>);
  const [dataKeys, setDataKeys] = useState<string[]>([]);

  const [data, setData] = useState<Datum>({});

  useEffect(() => {
    let total = 0;
    const result: Datum = {
      id: 1
    };

    const keys: string[] = [];
    const array: BalanceInfo[] = [];

    for (const value of Object.values(networkBalanceMaps)) {
      if (value.convertedBalanceValue.gt(0)) {
        array.push(value);
      }
    }

    const handlerSort = (a: BalanceInfo, b: BalanceInfo) => {
      return b.convertedBalanceValue.toNumber() - a.convertedBalanceValue.toNumber();
    };

    array.sort(handlerSort);

    array.forEach((value) => {
      const _val = value.convertedBalanceValue.toNumber();

      total += _val;

      if (keys.length > 5) {
        if (result.other !== undefined) {
          result.other = result.other + _val;
        } else {
          result.other = _val;
          keys.push('other');
        }
      } else {
        result[value.symbol] = _val;
        keys.push(value.symbol);
      }
    });

    if (total <= 0) {
      result.usdt = 43.5;
      result.near = 28.48;
      result.dot = 21.52;
      result.other = 6.5;
      keys.push('usdt', 'near', 'dot', 'other');
    }

    setData(result);
    setDataKeys(keys);
  }, [networkBalanceMaps]);

  const total = useMemo(() => {
    let result = 0;

    for (const dataKey of dataKeys) {
      if (dataKey in data) {
        // @ts-ignore
        result += data[dataKey];
      }
    }

    return result;
  }, [dataKeys, data]);

  const _theme = useMemo((): ChartTheme => {
    return getTheme(theme);
  }, [theme]);

  const CustomSymbolShape = ({ borderColor, borderWidth, fill, id, x, y }: SymbolProps) => (
    <g
      x={x}
      y={y}
    >
      <rect
        fill={fill}
        height='14'
        rx='3'
        stroke={borderColor}
        strokeWidth={borderWidth}
        style={{ pointerEvents: 'none' }}
        width='14'
        y='4'
      />
      <text
        fill={'#FFFFFF'}
        fontSize={15}
        fontStyle={'normal'}
        fontWeight={600}
        style={{
          textTransform: 'uppercase',
          lineHeight: 26
        }}
        x={20}
        y={16}
      >
        {id.toString().slice(0, 5)}
      </text>
    </g>
  );

  const renderLegend = useCallback((datum: LegendLabelDatum<Datum>) => {
    const value = datum.value || 0;

    return `(${(value / total * 100).toFixed(2)}%)`;
  }, [total]);

  const CustomBorder = useMemo(() => {
    // eslint-disable-next-line react/display-name
    return ({ bars }: BarCustomLayerProps<Datum>) => {
      return (
        <>
          {
            bars.map((bar, index) => {
              const radius = 5;

              if (index === 0) {
                return (
                  <g
                    key={index}
                    transform={`translate(${bar.x}, ${bar.y})`}
                  >
                    <path
                      d={`
                        M 0 0
                        L 0 ${bar.height}
                        L 5 ${bar.height}
                        A ${radius} ${radius} 1 0 1 0 ${bar.height - radius}
                        L 0 ${radius}
                        A ${radius} ${radius} 0 0 1 ${radius} 0
                        L 0 0
                      `}
                      fill={theme.background}
                    />
                  </g>
                );
              } else if (index === bars.length - 1) {
                return (
                  <g
                    key={index}
                    transform={`translate(${bar.x + bar.width - radius}, ${bar.y})`}
                  >
                    <path
                      d={`
                        M 0 0
                        L ${radius} 0
                        L ${radius} ${bar.height}
                        L 0 ${bar.height}
                        A ${radius} ${radius} 0 0 0 ${radius} ${bar.height - radius}
                        L ${radius} ${radius}
                        A ${radius} ${radius} 0 0 0 0 0
                      `}
                      fill={theme.background}
                    />
                  </g>
                );
              }

              return null;
            })
          }
        </>
      );
    };
  }, [theme]);

  const handlerRenderValue = useCallback((value: number) => {
    return new BigN(value).toFormat();
  }, []);

  const CustomTooltip = useMemo(() => {
    // eslint-disable-next-line react/display-name
    return ({ color, id, value }: BarTooltipProps<Datum>) => {
      return (
        <div
          style={{
            padding: 4,
            color: color,
            background: theme.textColor,
            borderRadius: 8
          }}
        >
          <strong>
            <span style={{ textTransform: 'uppercase' }}>{id}</span> : ${value}
          </strong>
        </div>
      );
    };
  }, [theme]);

  return (
    <div className={CN(className)}>
      <ResponsiveBar
        ariaLabel='Nivo bar chart demo'
        axisBottom={null}
        axisLeft={null}
        axisRight={null}
        axisTop={null}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              1.6
            ]
          ]
        }}
        colors={CHART_COLOR_SCHEMA}
        data={[data]}
        enableGridY={false}
        enableLabel={false}
        indexBy='id'
        indexScale={{ type: 'band', round: true }}
        keys={dataKeys}
        layers={[
          'grid',
          'axes',
          'bars',
          'markers',
          'legends',
          CustomBorder,
          'annotations'
        ]}
        layout='horizontal'
        legendLabel={renderLegend}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 20,
            itemsSpacing: 40,
            itemWidth: 140,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 70,
            symbolShape: CustomSymbolShape,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        margin={{ top: 0, right: 50, bottom: 20, left: 50 }}
        padding={0.5}
        role='application'
        theme={_theme}
        tooltip={CustomTooltip}
        valueFormat={handlerRenderValue}
        valueScale={{ type: 'linear' }}
      />
    </div>
  );
};

export default React.memo(styled(BarChart)(({ theme }: Props) => `
  height: 80px;
`));
