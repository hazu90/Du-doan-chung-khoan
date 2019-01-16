var predict_chan_combine={
    storage_name:{
        key_du_doan :'chan_all_du_doan_combine_4k_9k',
        curr_predict_continous :'chan_curr_predict_continous_combine_4k_9k',
        curr_3_before_continous :'chan_curr_3_before_continous_combine_4k_9k',
        curr_index_before_du_doan :'chan_curr_index_before_du_doan_combine_4k_9k'
    },
    predict_next_step_series:function(frame_combine) {
        var arr_general_du_doan = general_lib.get_array_from_local_storage(frame_combine.predict);
        if(arr_general_du_doan.length ==0 ){
            return;
        }

        var is_calc_predict = arr_general_du_doan.length %2 ==1 ? true : false;
        
        var arr_du_doan = general_lib.get_array_from_local_storage(predict_chan_combine.storage_name.key_du_doan + frame_combine.stt );
        if(arr_du_doan.length < 3){
            return ;
        }
        var obj_before_du_doan = localStorage.getItem(predict_chan_combine.storage_name.curr_predict_continous + frame_combine.stt);
        var arr_before_du_doan =[];
        if(obj_before_du_doan !=null){
            arr_before_du_doan = JSON.parse(obj_before_du_doan);
        }

        var index_before_du_doan = localStorage.getItem(predict_chan_combine.storage_name.curr_index_before_du_doan + frame_combine.stt);
        if (index_before_du_doan == null) {
            index_before_du_doan = 0;
        }
        else {
            index_before_du_doan = parseInt(index_before_du_doan);
        }
        // Nếu đang đánh bước lẻ thì hiển thị mức tiền dự đoán của bước chắn trước
        if(arr_general_du_doan.length % 2 ==1){
            predict_chan_combine.show_predict(frame_combine,arr_before_du_doan,index_before_du_doan,is_calc_predict);
            return;
        }
        var curr_3_before_continous = localStorage.getItem(predict_chan_combine.storage_name.curr_3_before_continous + frame_combine.stt);
        var is_repeat_du_doan = true;
        if(curr_3_before_continous == 'ext-predict-t-t-t'){
            if(arr_du_doan[arr_du_doan.length-1] == false){
                predict_chan_combine.show_predict(frame_combine,[],0,is_calc_predict);
                predict_chan_combine.set_current_data(frame_combine,[],0,'ext-predict-t-t-t-f');
                return;
            }
        }
        else if(curr_3_before_continous == 'ext-predict-t-t-t-f'){
            if(arr_du_doan[arr_du_doan.length -1 ] == true){
                var arr_predict_special = [true,true,false,true,false,true,false,true];
                predict_chan_combine.show_predict(frame_combine,arr_predict_special,1,is_calc_predict);
                predict_chan_combine.set_current_data(frame_combine,arr_predict_special,1,'ext-predict-t-t-t-f-t');    
            }
            else{
                var arr_predict_special = [false,false,false,true,true,false,false,true];
                predict_chan_combine.show_predict(frame_combine,arr_predict_special,1,is_calc_predict);
                predict_chan_combine.set_current_data(frame_combine,arr_predict_special,1,'ext-predict-t-t-t-f-f');    
            }
            return;
        }
        else if(curr_3_before_continous == 'ext-predict-f-f-f'){
            if(arr_du_doan[arr_du_doan.length-1] == true){
                predict_chan_combine.show_predict(frame_combine,[],0,is_calc_predict);
                predict_chan_combine.set_current_data(frame_combine,[],0,'ext-predict-f-f-f-t');
                return;
            }
        }
        else if(curr_3_before_continous == 'ext-predict-f-f-f-t'){
            if(arr_du_doan[arr_du_doan.length-1] == true){
                var arr_predict_special = [true,true,true,false,false,true,true,false];
                predict_chan_combine.show_predict(frame_combine,arr_predict_special,1,is_calc_predict);
                predict_chan_combine.set_current_data(frame_combine,arr_predict_special,1,'ext-predict-f-f-f-t-t');
            }
            else{
                var arr_predict_special =[false,false,true,false,true,false,true,false];
                predict_chan_combine.show_predict(frame_combine,arr_predict_special,1,is_calc_predict);
                predict_chan_combine.set_current_data(frame_combine,arr_predict_special,1,'ext-predict-f-f-f-t-f');
            }
            return;
        }
        else{
            if(obj_before_du_doan != null){
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
            predict_chan_combine.show_predict(frame_combine,arr_predict,0,is_calc_predict);
            predict_chan_combine.set_current_data(frame_combine,arr_predict,0,key);

        }
        else{
            index_before_du_doan += 1;
            predict_chan_combine.show_predict(frame_combine,arr_before_du_doan,index_before_du_doan,is_calc_predict);
            predict_chan_combine.set_current_data_without_curr_3_before_continous(frame_combine,arr_before_du_doan,index_before_du_doan);
        }
    },  
    show_predict(frame_combine,arr_predict,suggest_chose,is_calc_predict){
        if(arr_predict.length ==0){
            $('label[name=money_predict_chan_combine]').data('typemoney','N');
            $('label[name=money_predict_chan_combine]').data('amountmoney',0);
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
                if (index == suggest_chose && is_calc_predict) {
                    type_money = 'N';
                    html_predict += '<label style="border-bottom: 2px solid red;">N'+(index+1)+'</label>';
                }
                else{
                    html_predict += '   N'+(index+1);
                }
                
                html_predict += '</div>';
            }
        }
        if(is_calc_predict){
            $('label[name=money_predict_chan_combine_'+ frame_combine.stt+']').data('typemoney', type_money);
            $('label[name=money_predict_chan_combine_'+ frame_combine.stt+']').data('amountmoney', global_key_combine.money[suggest_chose]);
        }
        else{
            $('label[name=money_predict_chan_combine_'+ frame_combine.stt+']').data('typemoney', 'N');
            $('label[name=money_predict_chan_combine_'+ frame_combine.stt+']').data('amountmoney', 0);
        }
    },
    set_current_data : function(frame_combine,arr_curr_predict,curr_index,curr_3_before){
        localStorage.setItem(predict_chan_combine.storage_name.curr_predict_continous + frame_combine.stt,JSON.stringify(arr_curr_predict));
        localStorage.setItem(predict_chan_combine.storage_name.curr_index_before_du_doan + frame_combine.stt,curr_index);
        localStorage.setItem(predict_chan_combine.storage_name.curr_3_before_continous + frame_combine.stt,curr_3_before);
    },
    set_current_data_without_curr_3_before_continous : function(frame_combine,arr_curr_predict,curr_index){
        localStorage.setItem(predict_chan_combine.storage_name.curr_predict_continous + frame_combine.stt,JSON.stringify(arr_curr_predict));
        localStorage.setItem(predict_chan_combine.storage_name.curr_index_before_du_doan + frame_combine.stt,curr_index);
    }

};