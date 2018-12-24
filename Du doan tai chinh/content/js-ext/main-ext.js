
$(document).ready(function(){
    $('#btnExact').off('click').on('click',btnExact_Click);
    $('#btnFail').off('click').on('click',btnFail_Click);      
    $('#btnClear').off('click').on('click',function(){
        localStorage.clear();
        init_data();
        init_page();
    });
    $('#btnRollback').off('click').on('click',function(){
        var obj= localStorage.getItem(global_key.nine_frame_key_du_doan);
        var arr_du_doan =[];
        if(obj != null){
            arr_du_doan = JSON.parse(obj);   
        }
        if(arr_du_doan.length >1){
            localStorage.clear();
            init_data();
            init_page();
            for(var index =0;index < arr_du_doan.length-1;index++){
                if(arr_du_doan[index]){
                    $('#btnExact').trigger('click');
                }
                else{
                    $('#btnFail').trigger('click');
                }
            }
        }
    });
    localStorage.clear();
    init_data();
});

function btnExact_Click(){
    append_trung_or_truot(true);
    append_local_storage_trung_or_truot(true);
    var arr_frame = [
        global_key.nine_frame_1st_frame,
        global_key.nine_frame_2st_frame,
        global_key.nine_frame_3st_frame,
        global_key.nine_frame_4st_frame,
        global_key.nine_frame_5st_frame,
        global_key.nine_frame_6st_frame,
        global_key.nine_frame_7st_frame,
        global_key.nine_frame_8st_frame,
        global_key.nine_frame_9st_frame
    ];
    for (var index = 0; index < arr_frame.length; index++) {
        predict_next_steps(arr_frame[index]);
    }

    var arr_combine=[
         global_key.three_frame_combine_1st_2st_3st,
         global_key.three_frame_combine_2st_3st_4st,
         global_key.three_frame_combine_3st_4st_5st,
         global_key.three_frame_combine_4st_5st_6st,
         global_key.three_frame_combine_5st_6st_7st,
         global_key.three_frame_combine_6st_7st_8st,
         global_key.three_frame_combine_7st_8st_9st,
         global_key.three_frame_combine_8st_9st_1st,
         global_key.three_frame_combine_9st_1st_2st
        ];
    for(var index =0;index < arr_combine.length;index++){
        if(index == 7){
            show_combine_from_three_step(arr_frame[index],arr_frame[index+1],arr_frame[0],arr_combine[index]);
        }
        else if(index == 8){
            show_combine_from_three_step(arr_frame[index],arr_frame[0],arr_frame[1],arr_combine[index]);
        }
        else{
            show_combine_from_three_step(arr_frame[index],arr_frame[index+1],arr_frame[index+2],arr_combine[index]);
        }
        //predict_next_step_from_three_frame(arr_combine[index]);
        predict_next_step_next_from_three_frame(arr_combine[index]);
        
    }
    general_lib.show_total_ext();

};
function btnFail_Click(){
    append_trung_or_truot(false);
    append_local_storage_trung_or_truot(false);
    var arr_frame = [
        global_key.nine_frame_1st_frame,
        global_key.nine_frame_2st_frame,
        global_key.nine_frame_3st_frame,
        global_key.nine_frame_4st_frame,
        global_key.nine_frame_5st_frame,
        global_key.nine_frame_6st_frame,
        global_key.nine_frame_7st_frame,
        global_key.nine_frame_8st_frame,
        global_key.nine_frame_9st_frame
    ];
    for (var index = 0; index < arr_frame.length; index++) {
        predict_next_steps(arr_frame[index]);
    }
    var arr_combine=[
         global_key.three_frame_combine_1st_2st_3st,
         global_key.three_frame_combine_2st_3st_4st,
         global_key.three_frame_combine_3st_4st_5st,
         global_key.three_frame_combine_4st_5st_6st,
         global_key.three_frame_combine_5st_6st_7st,
         global_key.three_frame_combine_6st_7st_8st,
         global_key.three_frame_combine_7st_8st_9st,
         global_key.three_frame_combine_8st_9st_1st,
         global_key.three_frame_combine_9st_1st_2st
        ];
    for(var index =0;index < arr_combine.length;index++){
        if(index == 7){
            show_combine_from_three_step(arr_frame[index],arr_frame[index+1],arr_frame[0],arr_combine[index]);
        }
        else if(index == 8){
            show_combine_from_three_step(arr_frame[index],arr_frame[0],arr_frame[1],arr_combine[index]);
        }
        else{
            show_combine_from_three_step(arr_frame[index],arr_frame[index+1],arr_frame[index+2],arr_combine[index]);
        }
        //predict_next_step_from_three_frame(arr_combine[index]);
        predict_next_step_next_from_three_frame(arr_combine[index]);
        
    }

    general_lib.show_total_ext();
};
function append_trung_or_truot(is_trung){
    var html_trung ='<div class="dudoan trung">T</div>';
    var html_truot = '<div class="dudoan truot">N</div>';
    if(is_trung){
        $('#lst_ket_qua').append(html_trung);
    }   
    else{
        $('#lst_ket_qua').append(html_truot);    
    } 
}
function append_local_storage_trung_or_truot(is_trung){
    var obj= localStorage.getItem(global_key.nine_frame_key_du_doan);
    var arr_du_doan =[];
    if(obj != null){
        arr_du_doan = JSON.parse(obj);   
    }    
    arr_du_doan.push(is_trung);
    localStorage.setItem(global_key.nine_frame_key_du_doan,JSON.stringify(arr_du_doan) );    
}
function predict_next_steps (order_frame_obj){
    var obj_du_doan = localStorage.getItem(global_key.nine_frame_key_du_doan);
    var arr_du_doan =[];
    if(obj_du_doan != null){
        arr_du_doan = JSON.parse(obj_du_doan);
    }
    if(arr_du_doan.length <3){
        return;
    }
    // Lấy ra kết quả đã dự đoán trước đó
    var obj_before_du_doan = localStorage.getItem(order_frame_obj.curr_predicts);
    var index_before_du_doan = localStorage.getItem(order_frame_obj.curr_index);
    if (index_before_du_doan == null) {
        index_before_du_doan = 0;
    }
    else {
        index_before_du_doan = parseInt(index_before_du_doan);
    } 
    var arr_before_du_doan =[];
    var is_repeat_du_doan = true;
    if(obj_before_du_doan != null){
        arr_before_du_doan = JSON.parse(obj_before_du_doan);
        if (index_before_du_doan < 8 && arr_before_du_doan.length > index_before_du_doan){
            if(arr_before_du_doan[index_before_du_doan ] != arr_du_doan[arr_du_doan.length -1]){
                is_repeat_du_doan = false;
            }    
        }
    }

    // Lấy ra 3 kết quả gần nhất
    var key = '';
    if(is_repeat_du_doan){

        key = get_key_predict(arr_du_doan,order_frame_obj);

        var arr_predict =[];
        // Lấy ra kết quả dự đoán
        var obj_predict = localStorage.getItem(key);
        if(obj_predict != null){
            arr_predict = JSON.parse(obj_predict);
        }
        
        show_predict_ext(order_frame_obj.order_view,arr_predict,0,true);
        localStorage.setItem(order_frame_obj.curr_predicts,JSON.stringify(arr_predict) );
        localStorage.setItem(order_frame_obj.curr_index, 0);
    }
    else{
        // Tăng lên 1 mức đầu tư
        index_before_du_doan = index_before_du_doan+1;
        show_predict_ext(order_frame_obj.order_view, arr_before_du_doan, index_before_du_doan,true);
        localStorage.setItem(order_frame_obj.curr_predicts,JSON.stringify(arr_before_du_doan) );
        localStorage.setItem(order_frame_obj.curr_index,index_before_du_doan);
    }
}

function show_combine_from_three_step(first_frame,second_frame,third_frame,combine_frame){
    var first_predict = localStorage.getItem(first_frame.curr_predicts);
    var second_predict = localStorage.getItem(second_frame.curr_predicts);
    var third_predict = localStorage.getItem(third_frame.curr_predicts);
    if(first_predict == null || second_predict == null || third_predict == null){
        return;
    }
    var arr_first_predict = JSON.parse(first_predict);
    var index_first_predict = parseInt(localStorage.getItem(first_frame.curr_index));
    var total_predict = 0;
    if(arr_first_predict[index_first_predict]){
        total_predict += index_first_predict + 1; 
    }
    else{
        total_predict +=(-1) * (index_first_predict + 1) ;
    }

    var arr_second_predict = JSON.parse(second_predict);
    var index_second_predict = parseInt(localStorage.getItem(second_frame.curr_index));
    if(arr_second_predict[index_second_predict]){
        total_predict += index_second_predict + 1; 
    }
    else{
        total_predict +=(-1) * (index_second_predict + 1); 
    }

    var arr_third_predict = JSON.parse(third_predict);
    var index_third_predict = parseInt(localStorage.getItem(third_frame.curr_index));
    if(arr_third_predict[index_third_predict]){
        total_predict += index_third_predict + 1; 
    }
    else{
        total_predict +=(-1) * (index_third_predict + 1); 
    }
    var arr_combine_frame = general_lib.get_array_from_local_storage(combine_frame.du_doan);
    var html_trung ='<div class="dudoanbakhung trung">T</div>';
    var html_truot = '<div class="dudoanbakhung truot">N</div>';
    if(total_predict >0){
        arr_combine_frame.push(true);
        $('#'+combine_frame.view_du_doan_id).append(html_trung);
    }
    else{
        arr_combine_frame.push(false);
        $('#'+combine_frame.view_du_doan_id).append(html_truot);
    }
    localStorage.setItem(combine_frame.du_doan, JSON.stringify(arr_combine_frame));
}

function predict_next_step_next_from_three_frame(combine_frame){
    var arr_general_du_doan = general_lib.get_array_from_local_storage(global_key.nine_frame_key_du_doan);
    var arr_combine_du_doan = general_lib.get_array_from_local_storage(combine_frame.du_doan);
    if(arr_combine_du_doan.length <=1 ){
        return;
    }

    var arr_du_doan = general_lib.get_array_from_local_storage(combine_frame.du_doan_next);
    var html_trung ='<div class="dudoan trung">T</div>';
    var html_truot = '<div class="dudoan truot">N</div>';
    if(arr_general_du_doan[arr_general_du_doan.length - 1] == arr_combine_du_doan[arr_combine_du_doan.length - 2] ){
        $('#'+combine_frame.view_du_doan_next_next_id).append(html_trung);
        arr_du_doan.push(true);
    }
    else{
        $('#'+combine_frame.view_du_doan_next_next_id).append(html_truot);
        arr_du_doan.push(false);
    }
    localStorage.setItem(combine_frame.du_doan_next,JSON.stringify(arr_du_doan) );

    var is_calc_predict = true;
    arr_du_doan = general_lib.get_array_from_local_storage(combine_frame.du_doan_next);
    if(arr_du_doan.length < 3){
        return ;
    }

    var obj_before_du_doan = localStorage.getItem(combine_frame.curr_predicts_next);
    var arr_before_du_doan =[];
    if(obj_before_du_doan !=null){
        arr_before_du_doan = JSON.parse(obj_before_du_doan);
    }
    var index_before_du_doan = localStorage.getItem(combine_frame.curr_index_next);
    if (index_before_du_doan == null) {
        index_before_du_doan = 0;
    }
    else {
        index_before_du_doan = parseInt(index_before_du_doan);
    }

    var curr_3_before_continous = localStorage.getItem(combine_frame.curr_3_before_next);
    var is_repeat_du_doan = true;

    if(curr_3_before_continous == 'ext-predict-t-t-t'){
        if(arr_du_doan[arr_du_doan.length-1] == false){
            general_lib.show_predict_next(combine_frame,[],0,is_calc_predict);
            general_lib.set_current_data_next(combine_frame,[],0,'ext-predict-t-t-t-f');
            return;
        }
    }
    else if(curr_3_before_continous == 'ext-predict-t-t-t-f'){
        if(arr_du_doan[arr_du_doan.length -1 ] == true){
            var arr_predict_special = [true,true,false,true,false,true,false,true];
            general_lib.show_predict_next(combine_frame,arr_predict_special,1,is_calc_predict);
            general_lib.append_predict_three_frame_combine(combine_frame,arr_predict_special,1);
            general_lib.set_current_data_next(combine_frame,arr_predict_special,1,'ext-predict-t-t-t-f-t');    
        }
        else{
            var arr_predict_special = [false,false,false,true,true,false,false,true];
            general_lib.show_predict_next(combine_frame,arr_predict_special,1,is_calc_predict);
            general_lib.append_predict_three_frame_combine(combine_frame,arr_predict_special,1);
            general_lib.set_current_data_next(combine_frame,arr_predict_special,1,'ext-predict-t-t-t-f-f');    
        }
        return;
    }
    else if(curr_3_before_continous == 'ext-predict-f-f-f'){
        if(arr_du_doan[arr_du_doan.length-1] == true){
            general_lib.show_predict_next([],0,is_calc_predict);
            general_lib.append_predict_three_frame_combine(combine_frame,[],0);
            general_lib.set_current_data_next(combine_frame,[],0,'ext-predict-f-f-f-t');
            return;
        }
    }
    else if(curr_3_before_continous == 'ext-predict-f-f-f-t'){
        if(arr_du_doan[arr_du_doan.length-1] == true){
            var arr_predict_special = [true,true,true,false,false,true,true,false];
            general_lib.show_predict_next(combine_frame,arr_predict_special,1,is_calc_predict);
            general_lib.append_predict_three_frame_combine(combine_frame,arr_predict_special,1);
            general_lib.set_current_data_next(combine_frame,arr_predict_special,1,'ext-predict-f-f-f-t-t');
        }
        else{
            var arr_predict_special =[false,false,true,false,true,false,true,false];
            general_lib.show_predict_next(combine_frame,arr_predict_special,1,is_calc_predict);
            general_lib.append_predict_three_frame_combine(combine_frame,arr_predict_special,1);
            general_lib.set_current_data_next(combine_frame,arr_predict_special,1,'ext-predict-f-f-f-t-f');
        }
        return;
    }
    else{
        if(obj_before_du_doan != null){
            if (index_before_du_doan < 7 && arr_before_du_doan.length > index_before_du_doan) {
                var t_m = $('label[name=' + combine_frame.view_show_money_name + ']').data('typemoney');
                var a_m = $('label[name=' + combine_frame.view_show_money_name + ']').data('amountmoney');
                if (    ( arr_general_du_doan[arr_general_du_doan.length - 1] && t_m == 'N')
                    ||  (!arr_general_du_doan[arr_general_du_doan.length - 1] && t_m == 'T'))
                {
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
        general_lib.show_predict_next(combine_frame,arr_predict,0,is_calc_predict);
        general_lib.append_predict_three_frame_combine(combine_frame,arr_predict,0);
        general_lib.set_current_data_next(combine_frame,arr_predict,0,key);

    }
    else{
        index_before_du_doan += 1;
        general_lib.show_predict_next(combine_frame,arr_before_du_doan,index_before_du_doan,is_calc_predict);
        general_lib.append_predict_three_frame_combine(combine_frame,arr_before_du_doan,index_before_du_doan);
        general_lib.set_current_data_without_curr_3_before_continous_next(combine_frame,arr_before_du_doan,index_before_du_doan);
    }
}

function predict_next_step_from_three_frame(combine_frame){
    var arr_general_du_doan = general_lib.get_array_from_local_storage(combine_frame.du_doan);
    if(arr_general_du_doan.length ==0 ){
        return;
    }

    var arr_general_du_doan_over_all = general_lib.get_array_from_local_storage(global_key.nine_frame_key_du_doan);

    var is_calc_predict = true;//rr_general_du_doan.length %2 ==1 ? true : false;
    
    var arr_du_doan = general_lib.get_array_from_local_storage(combine_frame.du_doan);
    if(arr_du_doan.length < 3){
        return ;
    }
    var obj_before_du_doan = localStorage.getItem(combine_frame.curr_predicts);
    var arr_before_du_doan =[];
    if(obj_before_du_doan !=null){
        arr_before_du_doan = JSON.parse(obj_before_du_doan);
    }

    var index_before_du_doan = localStorage.getItem(combine_frame.curr_index);
    if (index_before_du_doan == null) {
        index_before_du_doan = 0;
    }
    else {
        index_before_du_doan = parseInt(index_before_du_doan);
    }
    // Nếu đang đánh bước lẻ thì hiển thị mức tiền dự đoán của bước chắn trước
    // if(arr_general_du_doan.length % 2 ==1){
    //     general_lib.show_predict(combine_frame,arr_before_du_doan,index_before_du_doan,is_calc_predict);
    //     return;
    // }
    var curr_3_before_continous = localStorage.getItem(combine_frame.curr_3_before);
    var is_repeat_du_doan = true;
    if(curr_3_before_continous == 'ext-predict-t-t-t'){
        if(arr_du_doan[arr_du_doan.length-1] == false){
            general_lib.show_predict(combine_frame,[],0,is_calc_predict);
            general_lib.set_current_data(combine_frame,[],0,'ext-predict-t-t-t-f');
            return;
        }
    }
    else if(curr_3_before_continous == 'ext-predict-t-t-t-f'){
        if(arr_du_doan[arr_du_doan.length -1 ] == true){
            var arr_predict_special = [true,true,false,true,false,true,false,true];
            general_lib.show_predict(combine_frame,arr_predict_special,1,is_calc_predict);
            general_lib.append_predict_three_frame_combine(combine_frame,arr_predict_special,1);
            general_lib.set_current_data(combine_frame,arr_predict_special,1,'ext-predict-t-t-t-f-t');    
        }
        else{
            var arr_predict_special = [false,false,false,true,true,false,false,true];
            general_lib.show_predict(combine_frame,arr_predict_special,1,is_calc_predict);
            general_lib.append_predict_three_frame_combine(combine_frame,arr_predict_special,1);
            general_lib.set_current_data(combine_frame,arr_predict_special,1,'ext-predict-t-t-t-f-f');    
        }
        return;
    }
    else if(curr_3_before_continous == 'ext-predict-f-f-f'){
        if(arr_du_doan[arr_du_doan.length-1] == true){
            general_lib.show_predict([],0,is_calc_predict);
            general_lib.append_predict_three_frame_combine(combine_frame,[],0);
            general_lib.set_current_data(combine_frame,[],0,'ext-predict-f-f-f-t');
            return;
        }
    }
    else if(curr_3_before_continous == 'ext-predict-f-f-f-t'){
        if(arr_du_doan[arr_du_doan.length-1] == true){
            var arr_predict_special = [true,true,true,false,false,true,true,false];
            general_lib.show_predict(combine_frame,arr_predict_special,1,is_calc_predict);
            general_lib.append_predict_three_frame_combine(combine_frame,arr_predict_special,1);
            general_lib.set_current_data(combine_frame,arr_predict_special,1,'ext-predict-f-f-f-t-t');
        }
        else{
            var arr_predict_special =[false,false,true,false,true,false,true,false];
            general_lib.show_predict(combine_frame,arr_predict_special,1,is_calc_predict);
            general_lib.append_predict_three_frame_combine(combine_frame,arr_predict_special,1);
            general_lib.set_current_data(combine_frame,arr_predict_special,1,'ext-predict-f-f-f-t-f');
        }
        return;
    }
    else{
        if(obj_before_du_doan != null){
            if (index_before_du_doan < 7 && arr_before_du_doan.length > index_before_du_doan){
                if(arr_before_du_doan[index_before_du_doan] != arr_general_du_doan_over_all[arr_general_du_doan_over_all.length -1]){
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
        general_lib.show_predict(combine_frame,arr_predict,0,is_calc_predict);
        general_lib.append_predict_three_frame_combine(combine_frame,arr_predict,0);
        general_lib.set_current_data(combine_frame,arr_predict,0,key);

    }
    else{
        index_before_du_doan += 1;
        general_lib.show_predict(combine_frame,arr_before_du_doan,index_before_du_doan,is_calc_predict);
        general_lib.append_predict_three_frame_combine(combine_frame,arr_before_du_doan,index_before_du_doan);
        general_lib.set_current_data_without_curr_3_before_continous(combine_frame,arr_before_du_doan,index_before_du_doan);
    }
}

function get_key_predict(arr_du_doan,order_frame){
    var lght_arr_du_doan = arr_du_doan.length;
    var key = '';
    key += arr_du_doan[lght_arr_du_doan - 3] == true ? 't' : 'f';
    key += arr_du_doan[lght_arr_du_doan - 2] == true ? 't' : 'f';
    key += arr_du_doan[lght_arr_du_doan - 1] == true ? 't' : 'f';

    switch(key){
        case 'ttt' : return order_frame.ttt_key;
        case 'ttf' : return order_frame.ttf_key;
        case 'tft' : return order_frame.tft_key;
        case 'tff' : return order_frame.tff_key;
        case 'ftt' : return order_frame.ftt_key;
        case 'ftf' : return order_frame.ftf_key;
        case 'fft' : return order_frame.fft_key;
        case 'fff' : return order_frame.fff_key;
    }
}

function show_predict_ext(order_view,arr_predict,suggest_chose,is_calc_predict){
    if(arr_predict.length ==0){
        $('#result_predict_cap_lien_tiep').html('');
        $('label[name=money_predict_cap_lien_tiep]').html('Số tiền : 0');
        $('label[name=money_predict_cap_lien_tiep]').data('typemoney', 'N');
        $('label[name=money_predict_cap_lien_tiep]').data('amountmoney', 0);
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
    $('#result_predict_'+order_view).html(html_predict);
}

function init_page(){
    $('#lst_ket_qua').html('');
    $('#result_predict_1st_frame').html('');
    $('#result_predict_1st_2st_3st_frame').html('');
    $('#result_predict_next_1st_2st_3st_frame').html('');
    $('#result_predict_next_next_1st_2st_3st_frame').html('');
    $('#result_predict_save_1st_2st_3st_frame').html('');
    $('label[name=money_predict_1st_2st_3st_frame]').html('Số tiền :');
    $('label[name=money_predict_1st_2st_3st_frame]').data('typemoney', 'N');
    $('label[name=money_predict_1st_2st_3st_frame]').data('amountmoney', 0);

    $('#result_predict_2st_frame').html('');
    $('#result_predict_2st_3st_4st_frame').html('');
    $('#result_predict_next_2st_3st_4st_frame').html('');
    $('#result_predict_next_next_2st_3st_4st_frame').html('');
    $('#result_predict_save_2st_3st_4st_frame').html('');
    $('label[name=money_predict_2st_3st_4st_frame]').html('Số tiền :');
    $('label[name=money_predict_2st_3st_4st_frame]').data('typemoney', 'N');
    $('label[name=money_predict_2st_3st_4st_frame]').data('amountmoney', 0);
    
    $('#result_predict_3st_frame').html('');
    $('#result_predict_3st_4st_5st_frame').html('');
    $('#result_predict_next_3st_4st_5st_frame').html('');
    $('#result_predict_next_next_3st_4st_5st_frame').html('');
    $('#result_predict_save_3st_4st_5st_frame').html('');
    $('label[name=money_predict_3st_4st_5st_frame]').html('Số tiền :');
    $('label[name=money_predict_3st_4st_5st_frame]').data('typemoney', 'N');
    $('label[name=money_predict_3st_4st_5st_frame]').data('amountmoney', 0);
    
    $('#result_predict_4st_frame').html('');
    $('#result_predict_4st_5st_6st_frame').html('');
    $('#result_predict_next_4st_5st_6st_frame').html('');
    $('#result_predict_next_next_4st_5st_6st_frame').html('');
    $('#result_predict_save_4st_5st_6st_frame').html('');
    $('label[name=money_predict_4st_5st_6st_frame]').html('Số tiền :');
    $('label[name=money_predict_4st_5st_6st_frame]').data('typemoney', 'N');
    $('label[name=money_predict_4st_5st_6st_frame]').data('amountmoney', 0);

    
    $('#result_predict_5st_frame').html('');
    $('#result_predict_5st_6st_7st_frame').html('');
    $('#result_predict_next_5st_6st_7st_frame').html('');
    $('#result_predict_next_next_5st_6st_7st_frame').html('');
    $('#result_predict_save_5st_6st_7st_frame').html('');
    $('label[name=money_predict_5st_6st_7st_frame]').html('Số tiền :');
    $('label[name=money_predict_5st_6st_7st_frame]').data('typemoney', 'N');
    $('label[name=money_predict_5st_6st_7st_frame]').data('amountmoney', 0);

    $('#result_predict_6st_frame').html('');
    $('#result_predict_6st_7st_8st_frame').html('');
    $('#result_predict_next_6st_7st_8st_frame').html('');
    $('#result_predict_next_next_6st_7st_8st_frame').html('');
    $('#result_predict_save_6st_7st_8st_frame').html('');
    $('label[name=money_predict_6st_7st_8st_frame]').html('Số tiền :');
    $('label[name=money_predict_6st_7st_8st_frame]').data('typemoney', 'N');
    $('label[name=money_predict_6st_7st_8st_frame]').data('amountmoney', 0);
    
    $('#result_predict_7st_frame').html('');
    $('#result_predict_7st_8st_9st_frame').html('');
    $('#result_predict_next_7st_8st_9st_frame').html('');
    $('#result_predict_next_next_7st_8st_9st_frame').html('');
    $('#result_predict_save_7st_8st_9st_frame').html('');
    $('label[name=money_predict_7st_8st_9st_frame]').html('Số tiền :');
    $('label[name=money_predict_7st_8st_9st_frame]').data('typemoney', 'N');
    $('label[name=money_predict_7st_8st_9st_frame]').data('amountmoney', 0);
    
    $('#result_predict_8st_frame').html('');
    $('#result_predict_8st_9st_1st_frame').html('');
    $('#result_predict_next_8st_9st_1st_frame').html('');
    $('#result_predict_next_next_8st_9st_1st_frame').html('');
    $('#result_predict_save_8st_9st_1st_frame').html('');
    $('label[name=money_predict_8st_9st_1st_frame]').html('Số tiền :');
    $('label[name=money_predict_8st_9st_1st_frame]').data('typemoney', 'N');
    $('label[name=money_predict_8st_9st_1st_frame]').data('amountmoney', 0);
    
    $('#result_predict_9st_frame').html('');
    $('#result_predict_9st_1st_2st_frame').html('');
    $('#result_predict_next_9st_1st_2st_frame').html('');
    $('#result_predict_next_next_9st_1st_2st_frame').html('');
    $('#result_predict_save_9st_1st_2st_frame').html('');
    $('label[name=money_predict_9st_1st_2st_frame]').html('Số tiền :');
    $('label[name=money_predict_9st_1st_2st_frame]').data('typemoney', 'N');
    $('label[name=money_predict_9st_1st_2st_frame]').data('amountmoney', 0);

}

function init_data() {
    localStorage.setItem(global_key.nine_frame_1st_frame.ttt_key, JSON.stringify([true, true, true, true, true, true, true, true,true]));
    localStorage.setItem(global_key.nine_frame_1st_frame.ttf_key, JSON.stringify([false, false, false, false, false, false, false, false,false]));
    localStorage.setItem(global_key.nine_frame_1st_frame.tft_key, JSON.stringify([true, true, true, true, true, true, true, true,true]));
    localStorage.setItem(global_key.nine_frame_1st_frame.tff_key, JSON.stringify([false, false, false, false, false, false, false, false,false]));
    localStorage.setItem(global_key.nine_frame_1st_frame.ftt_key, JSON.stringify([true, true, true, true, true, true, true, true, true]));
    localStorage.setItem(global_key.nine_frame_1st_frame.ftf_key, JSON.stringify([false, false, false, false, false, false, false, false,false]));
    localStorage.setItem(global_key.nine_frame_1st_frame.fft_key, JSON.stringify([true, true, true, true, true, true, true, true,true]));
    localStorage.setItem(global_key.nine_frame_1st_frame.fff_key, JSON.stringify([false, false, false, false, false, false, false, false,false]));

    localStorage.setItem(global_key.nine_frame_2st_frame.ttt_key, JSON.stringify([true, false, true, false, true, false, true, false, true]));
    localStorage.setItem(global_key.nine_frame_2st_frame.ttf_key, JSON.stringify([false, true, false, true, false, true, false, true, false]));
    localStorage.setItem(global_key.nine_frame_2st_frame.tft_key, JSON.stringify([true, false, true, false, true, false, true, false, true]));
    localStorage.setItem(global_key.nine_frame_2st_frame.tff_key, JSON.stringify([false, true, false, true, false, true, false, true, false]));
    localStorage.setItem(global_key.nine_frame_2st_frame.ftt_key, JSON.stringify([true, false, true, false, true, false, true, false, true]));
    localStorage.setItem(global_key.nine_frame_2st_frame.ftf_key, JSON.stringify([false, true, false, true, false, true, false, true, false]));
    localStorage.setItem(global_key.nine_frame_2st_frame.fft_key, JSON.stringify([true, false, true, false, true, false, true, false, true]));
    localStorage.setItem(global_key.nine_frame_2st_frame.fff_key, JSON.stringify([false, true, false, true, false, true, false, true, false]));

    localStorage.setItem(global_key.nine_frame_3st_frame.ttt_key, JSON.stringify([true, true, true, false, false, false, true, true, true]));
    localStorage.setItem(global_key.nine_frame_3st_frame.ttf_key, JSON.stringify([true, true, false, false, false, true, true, true, false]));
    localStorage.setItem(global_key.nine_frame_3st_frame.tft_key, JSON.stringify([false, false, true, true, true, false, false, false, true]));
    localStorage.setItem(global_key.nine_frame_3st_frame.tff_key, JSON.stringify([true, false, false, false, true, true, true, false, false]));
    localStorage.setItem(global_key.nine_frame_3st_frame.ftt_key, JSON.stringify([false, true, true, true, false, false, false, true, true]));
    localStorage.setItem(global_key.nine_frame_3st_frame.ftf_key, JSON.stringify([true, true, false, false, false, true, true, true, false]));
    localStorage.setItem(global_key.nine_frame_3st_frame.fft_key, JSON.stringify([false, false, true, true, true, false, false, false, true]));
    localStorage.setItem(global_key.nine_frame_3st_frame.fff_key, JSON.stringify([false, false, false, true, true, true, false, false, false]));

    localStorage.setItem(global_key.nine_frame_4st_frame.ttt_key, JSON.stringify([true, false, true, true, false, true, true, true, false]));
    localStorage.setItem(global_key.nine_frame_4st_frame.ttf_key, JSON.stringify([false, true, false, false, true, false, false, false, true]));
    localStorage.setItem(global_key.nine_frame_4st_frame.tft_key, JSON.stringify([true, false, true, true, false, true, true, true, false]));
    localStorage.setItem(global_key.nine_frame_4st_frame.tff_key, JSON.stringify([false, true, false, false, true, false, false, false, true]));
    localStorage.setItem(global_key.nine_frame_4st_frame.ftt_key, JSON.stringify([true, false, true, true, false, true, true, true, false]));
    localStorage.setItem(global_key.nine_frame_4st_frame.ftf_key, JSON.stringify([false, true, false, false, true, false, false, false, true]));
    localStorage.setItem(global_key.nine_frame_4st_frame.fft_key, JSON.stringify([true, false, true, true, false, true, true, true, false]));
    localStorage.setItem(global_key.nine_frame_4st_frame.fff_key, JSON.stringify([false, true, false, false, true, false, false, false, true]));

    localStorage.setItem(global_key.nine_frame_5st_frame.ttt_key, JSON.stringify([true, true, false, false, true, true, false, false, true]));
    localStorage.setItem(global_key.nine_frame_5st_frame.ttf_key, JSON.stringify([true, false, false, true, true, false, false, true, true]));
    localStorage.setItem(global_key.nine_frame_5st_frame.tft_key, JSON.stringify([false, true, true, false, false, true, true, false, false]));
    localStorage.setItem(global_key.nine_frame_5st_frame.tff_key, JSON.stringify([false, false, true, true, false, false, true, true, false]));
    localStorage.setItem(global_key.nine_frame_5st_frame.ftt_key, JSON.stringify([true, true, false, false, true, true, false, false, true]));
    localStorage.setItem(global_key.nine_frame_5st_frame.ftf_key, JSON.stringify([true, false, false, true, true, false, false, true, true]));
    localStorage.setItem(global_key.nine_frame_5st_frame.fft_key, JSON.stringify([false, true, true, false, false, true, true, false, false]));
    localStorage.setItem(global_key.nine_frame_5st_frame.fff_key, JSON.stringify([false, false, true, true, false, false, true, true, false]));

    localStorage.setItem(global_key.nine_frame_6st_frame.ttt_key, JSON.stringify([true, false, false, true, false, false, true, false, false]));
    localStorage.setItem(global_key.nine_frame_6st_frame.ttf_key, JSON.stringify([false, false, true, false, false, true, false, false, true]));
    localStorage.setItem(global_key.nine_frame_6st_frame.tft_key, JSON.stringify([true, true, false, true, true, false, true, true, false]));
    localStorage.setItem(global_key.nine_frame_6st_frame.tff_key, JSON.stringify([false, true, true, false, true, true, false, true, true]));
    localStorage.setItem(global_key.nine_frame_6st_frame.ftt_key, JSON.stringify([true, false, false, true, false, false, true, false, false]));
    localStorage.setItem(global_key.nine_frame_6st_frame.ftf_key, JSON.stringify([false, false, true, false, false, true, false, false, true]));
    localStorage.setItem(global_key.nine_frame_6st_frame.fft_key, JSON.stringify([true, true, false, true, true, false, true, true, false]));
    localStorage.setItem(global_key.nine_frame_6st_frame.fff_key, JSON.stringify([false, true, true, false, true, true, false, true, true]));

    localStorage.setItem(global_key.nine_frame_7st_frame.ttt_key, JSON.stringify([true, true, true, false, true, true, false, true, false]));
    localStorage.setItem(global_key.nine_frame_7st_frame.ttf_key, JSON.stringify([false, false, false, true, false, false, true, false, true]));
    localStorage.setItem(global_key.nine_frame_7st_frame.tft_key, JSON.stringify([true, true, true, false, true, true, false, true, false]));
    localStorage.setItem(global_key.nine_frame_7st_frame.tff_key, JSON.stringify([false, false, false, true, false, false, true, false, true]));
    localStorage.setItem(global_key.nine_frame_7st_frame.ftt_key, JSON.stringify([true, true, true, false, true, true, false, true, false]));
    localStorage.setItem(global_key.nine_frame_7st_frame.ftf_key, JSON.stringify([false, false, false, true, false, false, true, false, true]));
    localStorage.setItem(global_key.nine_frame_7st_frame.fft_key, JSON.stringify([true, true, true, false, true, true, false, true, false]));
    localStorage.setItem(global_key.nine_frame_7st_frame.fff_key, JSON.stringify([false, false, false, true, false, false, true, false, true]));

    localStorage.setItem(global_key.nine_frame_8st_frame.ttt_key, JSON.stringify([true, false, false, false, true, false, false, false, true]));
    localStorage.setItem(global_key.nine_frame_8st_frame.ttf_key, JSON.stringify([false, false, false, true, false, false, false, true, false]));
    localStorage.setItem(global_key.nine_frame_8st_frame.tft_key, JSON.stringify([false, false, true, false, false, false, true, false, false]));
    localStorage.setItem(global_key.nine_frame_8st_frame.tff_key, JSON.stringify([false, true, true, true, false, true, true, true, false]));
    localStorage.setItem(global_key.nine_frame_8st_frame.ftt_key, JSON.stringify([true, false, false, false, true, false, false, false, true]));
    localStorage.setItem(global_key.nine_frame_8st_frame.ftf_key, JSON.stringify([true, true, false, true, true, true, false, true, true]));
    localStorage.setItem(global_key.nine_frame_8st_frame.fft_key, JSON.stringify([true, true, true, false, true, true, true, false, true]));
    localStorage.setItem(global_key.nine_frame_8st_frame.fff_key, JSON.stringify([false, true, true, true, false, true, true, true, false]));

    localStorage.setItem(global_key.nine_frame_9st_frame.ttt_key, JSON.stringify([true, true, false, true, true, false, true, true, false]));
    localStorage.setItem(global_key.nine_frame_9st_frame.ttf_key, JSON.stringify([true, false, true, true, false, true, true, false, true]));
    localStorage.setItem(global_key.nine_frame_9st_frame.tft_key, JSON.stringify([false, true, false, false, true, false, false, true, false]));
    localStorage.setItem(global_key.nine_frame_9st_frame.tff_key, JSON.stringify([false, true, true, false, true, true, false, true, true]));
    localStorage.setItem(global_key.nine_frame_9st_frame.ftt_key, JSON.stringify([true, false, false, true, false, false, true, false, false]));
    localStorage.setItem(global_key.nine_frame_9st_frame.ftf_key, JSON.stringify([true, false, true, true, false, true, true, false, true]));
    localStorage.setItem(global_key.nine_frame_9st_frame.fft_key, JSON.stringify([false, true, false, false, true, false, false, true, false]));
    localStorage.setItem(global_key.nine_frame_9st_frame.fff_key, JSON.stringify([false, false, true, false, false, true, false, false, true]));

    localStorage.setItem('ext-predict-t-t-f', JSON.stringify([false, true, false, true, false, true, false, true]));
    localStorage.setItem('ext-predict-t-f-t', JSON.stringify([true, false, true, false, true, false, true, false]));
    localStorage.setItem('ext-predict-t-f-f', JSON.stringify([false, false, true, true, false, false, true, true]));
    localStorage.setItem('ext-predict-f-t-t', JSON.stringify([true, true, false, false, true, true, false, false]));
    localStorage.setItem('ext-predict-f-t-f', JSON.stringify([false, true, false, true, false, true, false, true]));
    localStorage.setItem('ext-predict-f-f-t', JSON.stringify([true, false, true, false, true, false, true, false]));
} 