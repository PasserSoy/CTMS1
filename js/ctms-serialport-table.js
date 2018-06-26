var Myport = 'http://localhost/zwp/measurtemper/set/';// 要改
layui.use(['layer','form','table'], function(){
  var $ = layui.jquery,layer = layui.layer,form = layui.form,table = layui.table;
  // 表单
  table.render({
    elem: '#mytable'
    ,height: 315
    ,id:'testReload'
    ,url: Myport+'getSerialList' //数据接口，要改
    ,cols: [[ //表头，要改
      {field: 'id', title: '序号',align:'center'}
      ,{field: 'serial_port', title: '串口号',align:'center'}
      ,{field: 'baud_rate', title: '波特率',align:'center'}
      ,{field: 'bata_bits', title: '数据位',align:'center'}
      ,{field: 'stop_bits', title: '停止位',align:'center'}
      ,{field: 'parity', title: '奇偶校验',templet: '#parity',align:'center'}
      ,{field: 'operate', title: '操作',toolbar: '#optbar',align:'center'}
    ]]
  });
	//监听工具条
	table.on('tool(mytable)', function(obj){
	  var data = obj.data; //获得当前行数据
	  var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
	  var tr = obj.tr; //获得当前行 tr 的DOM对象
	 
	  if(layEvent === 'del'){ //删除，要改
      layer.confirm('确定要删除此串口吗？',{ title:'提示',shadeClose:true,btnAlign: 'c',btn:['取消', '确定']}
      ,function(index){// 取消
	      layer.close(index);
	    },function(index){// 确定
        layer.close(index);
	      //向服务端发送删除指令
	      $.ajax({
		      url:Myport+'deleteSerial',//接口地址
		      dataType: "json",
		      data:{id:data.id},
		      success:function(data){ // 请求成功返回的数据
		        if(data.success){
		        	obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
		        	table.reload('testReload');
		        }else {
		        	layer.alert('失败');
		        }
		      }
		    });
      });
      // 增加回车删除事件
      $(document).one('keydown',function(e){
        if(e.keyCode == 13){
          $('.layui-layer-btn :contains("确定")').click();
        }
      });
	  }else if(obj.event === 'edit'){// 编辑，要改
      var forms = $('.insert').html();
      var hideInt = '<input type="hidden" class="editNum" value="1">';// 目的与新增区分开，有1的为编辑
      layer.open({
        type: 1
        ,offset: 'auto'
        ,title:'编辑串口'
        ,shadeClose:true
        ,id: 'mylayerauto' //防止重复弹出
        ,content: '<div style="padding: 2px 10px;">'+ forms+hideInt +'</div>'
      });
      // 表单初始赋值，要改
      form.val('myform',{
        id:data.id,
        serial_port:data.serial_port,
        baud_rate:data.baud_rate,
        bata_bits:data.bata_bits,
        stop_bits:data.stop_bits,
        parity:data.parity
      })
    }
	});
	// 弹窗主体
	var active = {
    offset: function(othis){
      var type = othis.data('type')
      ,text = othis.text()
      ,forms = $('.insert').html();        
      layer.open({
        type: 1
        ,offset: type
        ,title:text
        ,shadeClose:true
        ,id: 'mylayer'+type //防止重复弹出
        ,content: '<div style="padding: 2px 10px;">'+ forms +'</div>'
      });
    },
    // 查找
    reload: function(){
      var demoReload = $('#demoReload');     
      //执行重载
      table.reload('testReload', {
        page: {
          curr: 1 //重新从第 1 页开始
        }
        ,where: {
          key: {
            id: demoReload.val()
          }
        }
      });
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
    /** 判断是新增还是编辑：等于1是编辑 **/
    if($(data.form).siblings('.editNum').val()==1){// 编辑
      $.ajax({
        url:Myport+'upDateSerial',//接口地址
        dataType:"json",   
        data:data.field,//传参
        success:function(data){ // 请求成功返回的数据
          if(data.success){
            table.reload('testReload');// 成功后刷新表格
          }else {
            layer.alert('失败')
          }
        }
      })
    }else{// 新增
      $.ajax({
        url:Myport+'addSerial',//接口地址
        dataType: "json",
        data:data.field,//传参
        success:function(data){ // 请求成功返回的数据
          if(data.success){
            table.reload('testReload');// 成功后刷新表格
          }else {
            layer.alert('失败')
          }
        }
      })
    }// 表单提交结束
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