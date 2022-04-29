// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { linearGradientDef, Theme as ChartTheme } from '@nivo/core';
import { Point as LinePoint, PointSymbolProps, PointTooltipProps, ResponsiveLine } from '@nivo/line';
import BigN from 'bignumber.js';
import CN from 'classnames';
import dayjs from 'dayjs';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Theme, ThemeProps } from '@polkadot/extension-koni-ui/types';
import { CHART_TIME_KEYS } from '@polkadot/extension-koni-ui/util';

interface Props extends ThemeProps{
  className?: string;
  selectedTime: number;
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
    }
  };
};

interface Datum{
  x: Date,
  y: number
}

interface Point{
  x: number,
  y: number,
}

const MAX_RAND = 50000;
const MIN_RAND = 44000;

const LineChart = (props: Props) => {
  const { className, selectedTime } = props;
  const [data, setData] = useState<Datum[]>([]);
  const [point, setPoint] = useState<Point>({ x: 0, y: 0 });

  const LINE_OPACITY = useMemo(() => {
    const total = MAX_RAND * MIN_RAND < 0 ? Math.abs(MAX_RAND - MIN_RAND) : Math.max(MAX_RAND, MIN_RAND);
    const differ = Math.abs(MAX_RAND - MIN_RAND) * 100;

    return differ / total;
  }, []);

  useEffect(() => {
    let num = 0;
    let unit = 'hour';
    let step = 1;
    const result: Datum[] = [];

    switch (selectedTime) {
      case CHART_TIME_KEYS.T24H_ID:
        num = 24;
        unit = 'hour';
        step = 1;
        break;
      case CHART_TIME_KEYS.T7D_ID:
        num = 7;
        unit = 'day';
        step = 1;
        break;
      case CHART_TIME_KEYS.T30D_ID:
        num = 30;
        unit = 'day';
        step = 1;
        break;
      case CHART_TIME_KEYS.T90D_ID:
        num = 90;
        unit = 'day';
        step = 3;
        break;
      case CHART_TIME_KEYS.TALL_ID:
        num = 90;
        unit = 'day';
        step = 3;
        break;
      default:
        break;
    }

    const now = dayjs().startOf('hour');

    for (let i = 0; i < num; i = i + step) {
      result.push({
        x: now.subtract(i, unit).toDate(),
        y: Math.random() * (MAX_RAND - MIN_RAND) + MIN_RAND
      });
    }

    result.reverse();

    setData(result);
  }, [selectedTime]);

  const theme = useContext(ThemeContext as React.Context<Theme>);

  const _theme = useMemo(() => {
    return getTheme(theme);
  }, [theme]);

  const CustomTooltip = useMemo(() => {
    // eslint-disable-next-line react/display-name
    return ({ point }: PointTooltipProps) => {
      const { color, data } = point;
      const template = selectedTime === CHART_TIME_KEYS.T24H_ID ? 'DD/MM HH:mm' : 'DD/MM/YYYY';
      const dateTime = dayjs(data.x as Date).format(template);
      const _value = data.y as number;
      const displayVal = new BigN(_value).absoluteValue().toFormat(2);

      return (
        <div
          style={{
            padding: 8,
            color,
            background: theme.textColor,
            borderRadius: 8
          }}
        >
          <strong>
            {dateTime} : ${displayVal}
          </strong>
        </div>
      );
    };
  }, [selectedTime, theme]);

  const CustomPoint = useMemo(() => {
    // eslint-disable-next-line react/display-name
    return (props: Readonly<PointSymbolProps>) => {
      const x = props.datum.x as Date;
      const _p = {
        x: x.getTime(),
        y: props.datum.y as number
      };

      if (JSON.stringify(_p) !== JSON.stringify(point)) {
        return null;
      }

      return (
        <circle
          fill={props.color}
          r={props.size}
          stroke={props.borderColor}
          strokeWidth={props.borderWidth}
          style={{ pointerEvents: 'none' }}
        ></circle>
      );
    };
  }, [point]);

  const handlerOnMouseMove = useCallback((_point: LinePoint) => {
    const x = _point.data.x as Date;
    const _p = {
      x: x.getTime(),
      y: _point.data.y as number
    };

    if (JSON.stringify(_p) !== JSON.stringify(point)) {
      setPoint(_p);
    }
  }, [point]);

  const handlerOnMouseLeave = useCallback(() => {
    setPoint({
      x: 0,
      y: 0
    });
  }, []);

  return (
    <div className={CN(className)}>
      <ResponsiveLine
        areaOpacity={0.8}
        axisBottom={null}
        axisLeft={{
          tickSize: 0,
          tickPadding: 14,
          tickRotation: 0,
          tickValues: 6,
          format: (value) => `$${new BigN(value as number).absoluteValue().toFormat()}`
        }}
        axisRight={null}
        axisTop={null}
        colors={['#42C59A']}
        crosshairType='x'
        curve='monotoneX'
        data={[
          {
            id: 'balance',
            data: data
          }
        ]}
        defs={[
          linearGradientDef('gradient', [
            { offset: 0, color: 'inherit' },
            { offset: LINE_OPACITY, color: 'inherit', opacity: 0 }
          ])
        ]}
        enableArea={true}
        enableGridX={false}
        fill={[{ match: '*', id: 'gradient' }]}
        gridYValues={6}
        margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
        motionConfig='slow'
        onMouseLeave={handlerOnMouseLeave}
        onMouseMove={handlerOnMouseMove}
        pointBorderColor='#ffffff'
        pointBorderWidth={4}
        pointColor='#42c59a'
        pointLabelYOffset={-12}
        pointSize={10}
        pointSymbol={CustomPoint}
        theme={_theme}
        tooltip={CustomTooltip}
        useMesh={true}
        xScale={{ type: 'point' }}
        yFormat=' >-.2f'
        yScale={{
          type: 'linear',
          min: MIN_RAND,
          max: MAX_RAND,
          stacked: false,
          reverse: false
        }}
      />
    </div>
  );
};

export default React.memo(styled(LineChart)(({ theme }: Props) => `
  height: 330px;
`));
