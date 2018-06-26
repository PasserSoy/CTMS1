var Myport = 'http://localhost/zwp/measurtemper/data/';
// 温度表
var myChart1 = echarts.init(document.getElementById('temperature'));
myChart1.setOption({
  tooltip: {
    trigger: 'axis',
    formatter: `<ul class="echartData">
                <li class="edate"><i>日期：</i><em>{b}</em></li>
                <li class="Aphase"><i>{a}：</i><em>{c} ℃</em></li>
              </ul>`,
    backgroundColor: '#17324d'
  },
  grid: {
    left: '3%',
    right: '10%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    name: "日期(T)",
    data: [],
    max: function (value) {
      return value.max + 5;
    },
    axisLabel: {
      interval: 0 // 每个刻度都显示

    },
    boundaryGap: false // 坐标轴留白策略
  }],
  yAxis: [{
    type: 'value',
    max: function (value) {
      return value.max + 100;
    },
    name: "温度(℃)",
    splitNumber: 5, // 刻度间隔
    axisLine: {
      show: false // 是否显示坐标线
    },
    axisTick: {
      show: false // 是否显示坐标刻度
    }
  }],
  series: [{
    name: '温度(℃)',
    type: 'line',
    label: {
      normal: {
        show: true, // 是否显示坐标值
        position: 'right', // 值所在位置
        color: '#ff4802' // 值的颜色
      }
    },
    itemStyle: { // 面积颜色
      color: {
        type: 'linear',
        x: 1,
        x2: 0,
        y: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: '#f4f5b9' // 0% 处的颜色
        }, {
          offset: 1,
          color: '#ddd' // 100% 处的颜色
        }],
        globalCoord: true
      },
      borderColor: '#000' // 拐点颜色
    },
    lineStyle: {
      normal: {
        color: '#293c55' // 折线颜色
      }
    },
    areaStyle: {
      normal: {}
    },
    data: []
  }]
});
// 使用刚指定的配置项和数据显示图表。
// myChart1.setOption(option1);
myChart1.showLoading();
$.ajax({
  url:Myport+'getDataListForPiont?group_no=1&term_no=3&point_no=2&start=1529549086149&end=1529549128430',
  success:function(data){
    data = JSON.parse(data).data;
    var temper = x=>x.temper;
    var dates = x=>
    {
      var date = new Date(parseInt(x.timestamp));
      return x=date.toLocaleString('chinese',{hour12:false});
    }
    var tem = data.map(temper),
        dates = data.map(dates);
        console.log(tem)
        console.log(dates);
    myChart1.hideLoading();
    myChart1.setOption({
      xAxis: {
        data: dates
      },series: [{
        // 根据名字对应到相应的系列
        data: tem
      }]
    });
  }
})
$(window).resize(function () {
  myChart1.resize();
});