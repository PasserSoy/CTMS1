var Myport = 'http://localhost/zwp/measurtemper/data/';// 要改
layui.use(['layer','form','table','laydate'], function(){
  var $ = layui.jquery,layer = layui.layer,form = layui.form,table = layui.table,laydate = layui.laydate;
  // 提交表单，要改
  form.on('submit(*)', function(data){
    //console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
    //console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
    //console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
    myChart1.showLoading();// 显示loading
    $.ajax({
      url:Myport+'getDataListAll',//接口地址
      dataType: "json",
      data:data.field,//传参
      success:function(data){ // 请求成功返回的数据
        if(data.success){
          chart(data.data);
          //table.reload('testReload');// 成功后刷新表格
        }else {
          layer.alert('失败')
        }
      }
    })// 表单提交结束
    return false;//阻止表单跳转。如果需要表单跳转，去掉这段即可。
  });
  //日期时间范围
  laydate.render({
    elem: '#chooseTime'
    ,type: 'date'
    ,range: '到'
    ,format: 'yyyy/MM/dd'
    ,done: function(value, date, endDate){
      //console.log(value); //得到日期生成的值，如：2017-08-18
      //console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
      //console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
      var startT = `${date.year}/${date.month}/${date.date} ${date.hours}:${date.minutes}:${date.seconds}`;
      var endT = `${endDate.year}/${endDate.month}/${endDate.date} ${endDate.hours}:${endDate.minutes}:${endDate.seconds}`;
      startT=new Date(startT).getTime();// 转为时间戳
      endT=new Date(endT).getTime();
      var mistime = endT-startT;
      $('[name="start"]').val(startT);// 赋值
      $('[name="end"]').val(endT);
      if(mistime<=86400000){
        //console.log('一天')
        myChart1.setOption({
          xAxis: {
            data: ['0点','2点','4点','6点','8点','10点','12点','14点','16点','18点','20点','22点','24点']
          }
        });
      }else if(mistime<=518400000){
        // console.log('一周')
        myChart1.setOption({
          xAxis: {
            data: ['周一','周二','周三','周四','周五','周六','周日']
          }
        });
      }else{
        // console.log('一周以上')
        myChart1.setOption({
          xAxis: {
            data: ['1号','2号','4号','6号','8号','10号','12号','14号','16号','18号','20号','22号','24号']
          }
        });
      }
    }
  });
	//自定义皮肤
	layer.config({
	  extend: '/myskin/style.css', 
	  skin: 'layer-ext-myskin'
	});
})