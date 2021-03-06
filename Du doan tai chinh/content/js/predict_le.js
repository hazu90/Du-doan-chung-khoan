var predict_le={
    storage_name:{
        key_du_doan :'le_all_du_doan',
        curr_predict_continous :'le_curr_predict_continous',
        curr_3_before_continous :'le_curr_3_before_continous',
        curr_index_before_du_doan :'le_curr_index_before_du_doan'
    },
    predict_next_step_series:function() {
        var arr_general_du_doan = general_lib.get_array_from_local_storage(global_key.key_du_doan);
        if(arr_general_du_doan.length ==0 ){
            return;
        }
        var is_calc_predict = arr_general_du_doan.length %2 ==0 ? true : false;
        
        var arr_du_doan = general_lib.get_array_from_local_storage(predict_le.storage_name.key_du_doan);
        if(arr_du_doan.length < 3){
            return ;
        }
        var obj_before_du_doan = localStorage.getItem(predict_le.storage_name.curr_predict_continous);
        var arr_before_du_doan =[];
        if(obj_before_du_doan != null){
            arr_before_du_doan = JSON.parse(obj_before_du_doan);
        }
        var index_before_du_doan = localStorage.getItem(predict_le.storage_name.curr_index_before_du_doan);
        if (index_before_du_doan == null) {
            index_before_du_doan = 0;
        }
        else {
            index_before_du_doan = parseInt(index_before_du_doan);
        }
        if(arr_general_du_doan.length % 2 == 0){
            predict_le.show_predict(arr_before_du_doan,index_before_du_doan,is_calc_predict);
            return;
        }

        var curr_3_before_continous = localStorage.getItem(predict_le.storage_name.curr_3_before_continous);
        var is_repeat_du_doan = true;
        if(curr_3_before_continous == 'ext-predict-t-t-t'){
            if(arr_du_doan[arr_du_doan.length-1] == false){
                predict_le.show_predict([],0,is_calc_predict);
                predict_le.set_current_data([],0,'ext-predict-t-t-t-f');
                return;
            }
        }
        else if(curr_3_before_continous == 'ext-predict-t-t-t-f'){
            if(arr_du_doan[arr_du_doan.length -1 ] == true){
                var arr_predict_special = [true,true,false,true,false,true,false,true];
                predict_le.show_predict(arr_predict_special,1,is_calc_predict);
                predict_le.set_current_data(arr_predict_special,1,'ext-predict-t-t-t-f-t');    
            }
            else{
                var arr_predict_special = [false,false,false,true,true,false,false,true];
                predict_le.show_predict(arr_predict_special,1,is_calc_predict);
                predict_le.set_current_data(arr_predict_special,1,'ext-predict-t-t-t-f-f');    
            }
            return;
        }
        else if(curr_3_before_continous == 'ext-predict-f-f-f'){
            if(arr_du_doan[arr_du_doan.length-1] == true){
                predict_le.show_predict([],0,is_calc_predict);
                predict_le.set_current_data([],0,'ext-predict-f-f-f-t');
                return;
            }
        }
        else if(curr_3_before_continous == 'ext-predict-f-f-f-t'){
            if(arr_du_doan[arr_du_doan.length-1] == true){
                var arr_predict_special = [true,true,true,false,false,true,true,false];
                predict_le.show_predict(arr_predict_special,1,is_calc_predict);
                predict_le.set_current_data(arr_predict_special,1,'ext-predict-f-f-f-t-t');
            }
            else{
                var arr_predict_special =[false,false,true,false,true,false,true,false];
                predict_le.show_predict(arr_predict_special,1,is_calc_predict);
                predict_le.set_current_data(arr_predict_special,1,'ext-predict-f-f-f-t-f');
            }
            return;
        }
        else{
            //var obj_before_du_doan = localStorage.getItem(predict_le.storage_name.curr_predict_continous);

            if(obj_before_du_doan != null){
                //arr_before_du_doan = JSON.parse(obj_before_du_doan);
                if (index_before_du_doan < 7 && arr_before_du_doan.length > index_before_du_doan){
                    if(arr_before_du_doan[index_before_du_doan] != arr_du_doan[arr_du_doan.length -1]){
                        is_repeat_du_doan = false;
                    }    
                }
            }
        }

        var key ='ext-predict';
        if(is_repeat_du_doan){
            key += arr_du_doan[arr_du_doan.length -3] == true ? '-t' : '-f';
            key += arr_du_doan[arr_du_doan.length -2] == true ? '-t' : '-f';
            key += arr_du_doan[arr_du_doan.length -1] == true ? '-t' : '-f';
            
            var arr_predict =[];
            if(key == 'ext-predict-t-t-t'){
                arr_predict.push(true);
            }
            else if(key == 'ext-predict-f-f-f'){
                arr_predict.push(false);
            }
            else{
                arr_predict = general_lib.get_array_from_local_storage(key);
            }
            predict_le.show_predict(arr_predict,0,is_calc_predict);
            predict_le.set_current_data(arr_predict,0,key);

        }
        else{
            index_before_du_doan += 1;
            predict_le.show_predict(arr_before_du_doan,index_before_du_doan,is_calc_predict);
            predict_le.set_current_data_without_curr_3_before_continous(arr_before_du_doan,index_before_du_doan);
        }
    },  
    show_predict(arr_predict,suggest_chose,is_calc_predict){
        if(arr_predict.length ==0){
            $('#result_predict_le').html('');
            $('label[name=money_predict_le]').html('Số tiền : 0');
            $('label[name=money_predict_le]').data('typemoney', 'N');
            $('label[name=money_predict_le]').data('amountmoney', 0);
            return;
        }
    
        var type_money = '';
        var html_predict='';
        for(var index =0;index < arr_predict.length;index++){
            if(arr_predict[index]){
                html_predict += '<div class="predict-choosen">';
                html_predict += '   <div class="arrow-up"></div>';
                if (index == suggest_chose && is_calc_predict) {
                    type_money = 'T';
                    html_predict += '<label style="border-bottom: 2px solid red;">T'+(index+1)+'</label>';
                }
                else{
                    html_predict += '   T'+(index+1);
                }
                
                html_predict += '</div>';
            }
            else{
                html_predict += '<div class="predict-choosen">';
                html_predict += '   <div class="arrow-down"></div>';
                if (index == suggest_chose  && is_calc_predict) {
                    type_money = 'N';
                    html_predict += '<label style="border-bottom: 2px solid red;">N'+(index+1)+'</label>';
                }
                else{
                    html_predict += '   N'+(index+1);
                }
                
                html_predict += '</div>';
            }
        }
        $('#result_predict_le').html(html_predict);
        if(is_calc_predict){
            $('label[name=money_predict_le]').html('Số tiền : ' + type_money + global_key.money[suggest_chose]);
            $('label[name=money_predict_le]').data('typemoney', type_money);
            $('label[name=money_predict_le]').data('amountmoney', global_key.money[suggest_chose]);
        }
        else{
            $('label[name=money_predict_le]').html('Số tiền : 0');
            $('label[name=money_predict_le]').data('typemoney', 'N');
            $('label[name=money_predict_le]').data('amountmoney', 0);
        }
        
        //general_lib.calc_total(type_money, global_key.money[suggest_chose]);
    },
    set_current_data : function(arr_curr_predict,curr_index,curr_3_before){
        localStorage.setItem(predict_le.storage_name.curr_predict_continous,JSON.stringify(arr_curr_predict));
        localStorage.setItem(predict_le.storage_name.curr_index_before_du_doan,curr_index);
        localStorage.setItem(predict_le.storage_name.curr_3_before_continous,curr_3_before);
    },
    set_current_data_without_curr_3_before_continous : function(arr_curr_predict,curr_index){
        localStorage.setItem(predict_le.storage_name.curr_predict_continous,JSON.stringify(arr_curr_predict));
        localStorage.setItem(predict_le.storage_name.curr_index_before_du_doan,curr_index);
    }

};