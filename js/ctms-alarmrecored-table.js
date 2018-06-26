var Myport = 'http://localhost/zwp/measurtemper/set/';// 要改
var MyTab = 'http://localhost/zwp/measurtemper/alarm/';// 要改
layui.use(['layer','form','table'], function(){
  var $ = layui.jquery,layer = layui.layer,form = layui.form,table = layui.table;
  // 表单
  table.render({
    elem: '#mytable'
    ,height: 315
    ,id:'testReload'
    ,url: MyTab+'GetAlarmRecord' //数据接口，要改
    // ,where:{group_no:localStorage.group_no,term_no:localStorage.term_no}// 传入群号，组号
    ,where:{group_no:1,term_no:3}// 传入群号，组号
    ,cols: [[ //表头，要改
      {field: 'id', title: '序号',align:'center'}
      ,{field: 'alarm_type', title: '类型',align:'center'}
      ,{field: 'group_no', title: '群号',align:'center'}
      ,{field: 'term_no', title: '组号',align:'center'}
      ,{field: 'level', title: '级别',templet: '#level',align:'center'}
      ,{field: 'timestamp', title: '时间',templet: '#timestamp',align:'center'}
    ]]
  });
	// 弹窗主体，报警设置
	var active = {
    offset: function(othis){
      var type = othis.data('type')
      ,text = othis.text()
      ,forms = $('.insert').html();        
      layer.open({
        type: 1
        ,area: ['395px', '500px']
        ,offset: type
        ,title:text
        ,shadeClose:true
        ,id: 'mylayer'+type //防止重复弹出
        ,content: '<div style="padding: 2px 10px;">'+ forms +'</div>'
      });
      $.ajax({
        url:Myport+'GetAlarmSet',//接口地址
        dataType:"json",   
        success:function(data){ // 请求成功返回的数据
          if(data.success){
            data = data.data;
            // 表单初始赋值，要改
            form.val('myform',{
              id:data.id,
              max:data.max,
              warn:data.warn,
              desc_max:data.desc_max,
              desc_warn:data.desc_warn,
              desc_4h_max:data.desc_4h_max,
              desc_4h_warn:data.desc_4h_warn,
              int_to_out_max:data.int_to_out_max,
              int_to_out_warn:data.int_to_out_warn,
              out_to_air_max:data.out_to_air_max,
              out_to_air_warn:data.out_to_air_warn
            })
          }else {
            layer.alert('失败')
          }
        }
      })
    }
  };
  // 呼出弹窗
  $('.addbtn').on('click',function(){
    var othis = $(this), method = othis.data('method');
    active[method] ? active[method].call(this, othis) : '';
    form.render();
  });
  // 提交表单，要改
  form.on('submit(*)', function(data){
    //console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
    //console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
    //console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
    $.ajax({
      url:Myport+'UpdateAlarmSet',//接口地址
      dataType: "json",
      data:data.field,//传参
      success:function(data){ // 请求成功返回的数据
        if(data.success){
          layer.alert('设置成功')
          //table.reload('testReload');// 成功后刷新表格
        }else {
          layer.alert('失败')
        }
      }
    })// 表单提交结束
    layer.closeAll();//关闭弹窗
    return false;//阻止表单跳转。如果需要表单跳转，去掉这段即可。
  });
  // 表单验证
  form.verify({
    special: function(value, item){ //value：表单的值、item：表单的DOM对象
      if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
        return '不能有特殊字符';
      }
    }
  }); 
  // 搜索
  $('.search-btn').on('click', function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
  });
	//自定义皮肤
	layer.config({
	  extend: '/myskin/style.css', 
	  skin: 'layer-ext-myskin'
	});
});