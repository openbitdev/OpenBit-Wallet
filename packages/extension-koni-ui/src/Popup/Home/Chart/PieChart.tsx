// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Theme as ChartTheme } from '@nivo/core';
import { SymbolProps } from '@nivo/legends/dist/types/svg/symbols/types';
import { PieTooltipProps, ResponsivePie } from '@nivo/pie';
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
  id: string,
  label: string,
  value: number
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

const PieChart = (props: Props) => {
  const { className, networkBalanceMaps } = props;
  const theme = useContext(ThemeContext as React.Context<Theme>);

  const [data, setData] = useState<Datum[]>([]);

  useEffect(() => {
    let total = 0;
    const result: Datum[] = [];

    const array: BalanceInfo[] = [];

    for (const value of Object.values(networkBalanceMaps)) {
      if (value.convertedBalanceValue.gt(0)) {
        array.push(value);
      }
    }

    array.forEach((value) => {
      const _val = value.convertedBalanceValue.toNumber();

      total += _val;

      if (result.length > 4) {
        if (result.length > 5) {
          result[5].value = result[5].value + _val;
        } else {
          const data: Datum = {
            id: 'other',
            label: '',
            value: _val
          };

          result.push(data);
        }
      } else {
        const data: Datum = {
          id: value.symbol,
          label: '',
          value: _val
        };

        result.push(data);
      }
    });

    if (total <= 0) {
      const usdt: Datum = {
        value: 43.5,
        id: 'usdt',
        label: ''
      };
      const near: Datum = {
        value: 28.48,
        id: 'near',
        label: ''
      };
      const dot: Datum = {
        value: 21.52,
        id: 'dot',
        label: ''
      };
      const other: Datum = {
        value: 6.5,
        id: 'other',
        label: ''
      };

      result.push(usdt, near, dot, other);
      total = 100;
    }

    for (const datum of result) {
      datum.label = `(${(datum.value / total * 100).toFixed(2)}%)`;
    }

    setData(result);
  }, [networkBalanceMaps]);

  const _theme = useMemo((): ChartTheme => {
    return getTheme(theme);
  }, [theme]);

  const CustomSymbolShape = ({ borderColor, borderWidth, fill, id, x, y }: SymbolProps) => (
    <g
      style={{
        pointerEvents: 'none'
      }}
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
        x={0}
        y={4}
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

  const handlerRenderValue = useCallback((value: number) => {
    return new BigN(value).toFormat();
  }, []);

  const CustomTooltip = useMemo(() => {
    // eslint-disable-next-line react/display-name
    return ({ datum }: PieTooltipProps<Datum>) => {
      const { color, id, value } = datum;

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
      <ResponsivePie
        activeOuterRadiusOffset={3}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              2
            ]
          ]
        }}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor='#333333'
        arcLinkLabelsThickness={2}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              0.2
            ]
          ]
        }}
        borderWidth={1}
        colors={CHART_COLOR_SCHEMA}
        cornerRadius={3}
        data={data}
        enableArcLabels={false}
        enableArcLinkLabels={false}
        endAngle={0}
        innerRadius={0.8}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 180,
            translateY: 0,
            itemsSpacing: 10,
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
        margin={{ top: 20, right: 180, bottom: 20, left: 20 }}
        padAngle={1}
        sortByValue={true}
        startAngle={360}
        theme={_theme}
        tooltip={CustomTooltip}
        valueFormat={handlerRenderValue}
      />
    </div>
  );
};

export default React.memo(styled(PieChart)(({ theme }: Props) => `
  height: 240px;
  width: 400px;
`));
