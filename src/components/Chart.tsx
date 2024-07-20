"use client"

import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartProps {
    data: { time: string; price: number }[];
}

const chartConfig = {
    desktop: {
        label: "Desktop",
    },
} satisfies ChartConfig

export const Chart: React.FC<ChartProps> = ({ data }) => {
    return (
        <ChartContainer config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={data}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <Area
                    dataKey="price"
                    type="linear"
                    fillOpacity={0.0}
                    stroke="#078DEE"
                />
            </AreaChart>
        </ChartContainer>
    )
}
