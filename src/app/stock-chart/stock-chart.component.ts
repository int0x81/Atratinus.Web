import { Component, Input, OnInit } from '@angular/core';
import { InvestmentCampaign } from '../models/investmentCampaign';
import { AreaStyleOptions, ChartOptions, createChart, DeepPartial, LineData, SeriesMarker, SeriesOptions, Time } from 'lightweight-charts';

const modalBreakpointXL = 1279;
const modalBreakpointM = 500;

const chartWidthXL = 600;
const chartHeightXL = 300;
const chartWidthM = 400;
const chartHeightM = 200;
const chartWidthSM = 200;
const chartHeightSM = 100;

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.sass']
})
export class StockChartComponent implements OnInit {

  private currentChartWidth: number;
  private currentChartHeight: number;
  @Input() stockData: LineData[];
  @Input() investmentCampaign: InvestmentCampaign;

  constructor() { }

  ngOnInit(): void {

    const areaOptions = this.determineAreaOptions(this.stockData);

    const chartElement = document.getElementById('campaignDevelopmentChart');

    this.setChartSizes();

    const chart = createChart(chartElement, this.getChartOptions());

    const areaSeries = chart.addAreaSeries(areaOptions);

    areaSeries.setData(this.stockData);

    const markers = this.getMarkers();

    areaSeries.setMarkers(markers);

    chart.timeScale().setVisibleRange({
      from: this.stockData[0].time,
      to: this.stockData[this.stockData.length - 1].time
    });

    window.addEventListener('resize', () => {

      this.setChartSizes();
      chart.resize(this.currentChartWidth, this.currentChartHeight, true);
      chart.timeScale().resetTimeScale();
    });
  }

  private setChartSizes() {

    if(window.innerWidth > modalBreakpointXL) {
      this.currentChartWidth = chartWidthXL;
      this.currentChartHeight = chartHeightXL;
      return;
    }
    else if(window.innerWidth <= modalBreakpointXL && window.innerWidth > modalBreakpointM) {
      this.currentChartWidth = chartWidthM;
      this.currentChartHeight = chartHeightM;
      return;
    } else {
      this.currentChartWidth = chartWidthSM;
      this.currentChartHeight = chartHeightSM;
    }
  }

  private determineAreaOptions(stockData: LineData[]): DeepPartial<SeriesOptions<AreaStyleOptions>> {

    let color: string;
    if(stockData[0].value < stockData[stockData.length -1].value)
      color = '32, 226, 47';  //Green
    else if (stockData[0].value > stockData[stockData.length -1].value)
      color = '255, 0, 0';    //Red
    else
      color = '33, 150, 243'; //Blue

    return {
      topColor: `rgba(${color}, 0.56)`,
      bottomColor: `rgba(${color}, 0.04)`,
      lineColor: `rgba(${color}, 1)`,
      lineWidth: 3,
    }
  }

  private getChartOptions(): DeepPartial<ChartOptions> {
    return {
      width: this.currentChartWidth,
      height: this.currentChartHeight,
      localization: {
        locale: 'en-US',
        dateFormat: 'yyyy-MM-dd'
      },
      layout: {
        fontFamily: 'Arial',
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 1)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 1)',
        fixLeftEdge: true,
      },
      handleScroll: {
        mouseWheel: false,
        pressedMouseMove: true,
      },
      handleScale: {
        axisPressedMouseMove: false,
        mouseWheel: false,
        pinch: false,
      },
      grid: {
        vertLines: {
            color: 'rgba(70, 130, 180, 0.5)',
            style: 1,
            visible: false,
        },
        horzLines: {
            color: 'rgba(70, 130, 180, 0.5)',
            style: 1,
            visible: false,
        },
      },
    }
  }

  private getMarkers(): SeriesMarker<Time>[] {
    return [
      {
        time: {
          year: this.investmentCampaign.startOfCampaign.getFullYear(),
          month: this.investmentCampaign.startOfCampaign.getMonth() + 1,
          day: this.investmentCampaign.startOfCampaign.getDate()
        },
        position: 'belowBar',
        color: '#000000',
        shape: 'arrowUp',
        text: 'Start of Campaign'
      },
      {
        time: {
          year: this.investmentCampaign.endOfCampaign.getFullYear(),
          month: this.investmentCampaign.endOfCampaign.getMonth() + 1,
          day: this.investmentCampaign.endOfCampaign.getDate()
        },
        position: 'belowBar',
        color: '#000000',
        shape: 'arrowUp',
        text: 'End of Campaign'
      }
    ]
  }
}
