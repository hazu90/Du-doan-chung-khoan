var global_key = {
    key_du_doan: 'all_du_doan',
    key_du_doan_chan: 'chan_all_du_doan',
    key_du_doan_le: 'le_all_du_doan',
    key_du_doan_chan_le_lien_tiep: 'lien_tiep_all_du_doan',
    key_du_doan_chan_le_tach_biet :'tach_biet_all_du_doan',
    money :[1.05,3.21,7.64,16.74,35.41,74,153,315],
    curr_predict_continous:'curr_predict_continous',
    curr_index_continous : 'curr_index_continous',
    curr_3_before_continous :'curr_3_before_continous',
    dd_chan_cong_cap_doi_mot :'dd_chan_cong_cap_doi_mot',
    doi_chan_cong_cap_doi_mot :'doi_chan_cong_cap_doi_mot',
    luot_truoc_chan_cap_doi :'luot_truoc_chan_cap_doi'
};
$(document).ready(function(){
    $('#btnExact').off('click').on('click',btnExact_Click);
    $('#btnFail').off('click').on('click',btnFail_Click);      
    $('#btnClear').off('click').on('click',function(){
        localStorage.clear();
        init_data();
        init_page();
    });
    $('#btnRollback').off('click').on('click',function(){
        var obj= localStorage.getItem(global_key.key_du_doan);
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

    $('#btnShowTotal').off('click').on('click',function(){
        if( $('div#wrap_base_du_doan').hasClass('hide')){
            $(this).html('Kết quả tổng');
            $('div#wrap_base_du_doan').removeClass('hide');
            $('div#wrap_tinh_tong_du_doan').addClass('hide');
        }
        else{
            $(this).html('Kết quả dự đoán');
            $('div#wrap_base_du_doan').addClass('hide');
            $('div#wrap_tinh_tong_du_doan').removeClass('hide');
        }
    });

    // Lấy ra danh sách các dự đoán từ trước của người dùng
    // var obj= localStorage.getItem(global_key.key_du_doan);
    // var arr_du_doan =[];
    // if(obj != null){
    //     arr_du_doan = JSON.parse(obj);   
    // }
    
    // if(arr_du_doan.length > 0){
    //     for (var index = 0; index < arr_du_doan.length; index++) {
    //         append_trung_or_truot(arr_du_doan[index]);
    //     }
    // }
    localStorage.clear();
    init_data();

    init_page();

    $('.predict-choosen-canclick div[name=arrow_up]').each(function(){
        $(this).off('click').on('click',function(){
             var key = $(this).data('localstoragekey');
             var index = $(this).data('index');   
             chon_trung_sample(key,index);
             $(this).removeClass('not-choosen');
             $('.arrow-down',$(this).closest('.predict-choosen')).addClass('not-choosen');
             show_sample_detail(key);
        });    
    });

    $('.predict-choosen-canclick div[name=arrow_down]').each(function(){
        $(this).off('click').on('click',function(){
             var key = $(this).data('localstoragekey');
             var index = $(this).data('index');
             chon_nguoc_sample(key,index);   
             $(this).removeClass('not-choosen');
             $('.arrow-up',$(this).closest('.predict-choosen')).addClass('not-choosen');
             show_sample_detail(key);
        });
    });    

});

function init_data(){
    localStorage.setItem('predict-t-t-t', JSON.stringify([false, false, false, false, false, false, false, false]));
    localStorage.setItem('predict-t-t-f', JSON.stringify([false, true, false, true, false, true, false, true]));
    localStorage.setItem('predict-t-f-t', JSON.stringify([true, false, true, false, true, false, true, false]));
    localStorage.setItem('predict-f-t-t', JSON.stringify([false, false, false, false, false, false, false, false]));
    localStorage.setItem('predict-f-t-f', JSON.stringify([false, true, false, true, false, true, false, true]));
    localStorage.setItem('predict-f-f-t', JSON.stringify([false, false, false, false, false, false, false, false]));

    localStorage.setItem('ext-predict-t-t-f', JSON.stringify([false, true, false, true, false, true, false, true]));
    localStorage.setItem('ext-predict-t-f-t', JSON.stringify([true, false, true, false, true, false, true, false]));
    localStorage.setItem('ext-predict-t-f-f', JSON.stringify([false, false, true, true, false, false, true, true]));
    localStorage.setItem('ext-predict-f-t-t', JSON.stringify([true, true, false, false, true, true, false, false]));
    localStorage.setItem('ext-predict-f-t-f', JSON.stringify([false, true, false, true, false, true, false, true]));
    localStorage.setItem('ext-predict-f-f-t', JSON.stringify([true, false, true, false, true, false, true, false]));

    localStorage.setItem('total-predict-t-t-t',JSON.stringify([false,false,false,false,false,false,false,false,false]));
    localStorage.setItem('total-predict-f-f-f',JSON.stringify([true,true,true,true,true,true,true,true,true]));
    localStorage.setItem('total-predict-t-f-f',JSON.stringify([false,false,true,true,false,false,true,true,false]));
    localStorage.setItem('total-predict-f-t-t',JSON.stringify([true,true,false,false,true,true,false,false,true]));
    localStorage.setItem('total-predict-t-f-t-f',JSON.stringify([false,true,false,true,false,true,false,true,false]));
    localStorage.setItem('total-predict-t-f-t-t',JSON.stringify([true,true,false,false,true,true,false,false,true]));
    localStorage.setItem('total-predict-f-t-f-t',JSON.stringify([true,false,true,false,true,false,true,false,true]));
    localStorage.setItem('total-predict-f-t-f-f',JSON.stringify([false,false,true,true,false,false,true,true,false]));
    localStorage.setItem('total-predict-t-t-f-f',JSON.stringify([false,false,true,true,false,false,true,true,false]));
    localStorage.setItem('total-predict-t-t-f-t-f',JSON.stringify([false,true,false,true,false,true,false,true,false]));
    localStorage.setItem('total-predict-t-t-f-t-t',JSON.stringify([true,true,false,false,true,true,false,false,true]));
    localStorage.setItem('total-predict-f-f-t-t',JSON.stringify([true,true,false,false,true,true,false,false,true]));
    localStorage.setItem('total-predict-f-f-t-f-t',JSON.stringify([true,false,true,false,true,false,true,false,true]));
    localStorage.setItem('total-predict-f-f-t-f-f',JSON.stringify([false,false,true,true,false,false,true,true,false]));

    localStorage.setItem('total_N',0);
    localStorage.setItem('total_T',0);
} 

function init_page(){
    $('#lst_ket_qua').html('');
    $('#result_predict_continuous').html('');
    $('label[name=money_predict_continuous]').html('Số tiền :');
    $('label[name=money_predict_continuous]').data('typemoney', 'N');
    $('label[name=money_predict_continuous]').data('amountmoney', 0);
    $('#lst_ket_qua_chan').html('');
    $('#result_predict_chan').html('');
    $('label[name=money_predict_chan]').html('Số tiền :');
    $('label[name=money_predict_chan]').data('typemoney', 'N');
    $('label[name=money_predict_chan]').data('amountmoney', 0);
    $('#lst_ket_qua_le').html('');
    $('#result_predict_le').html('');
    $('label[name=money_predict_le]').html('Số tiền :');
    $('label[name=money_predict_le]').data('typemoney', 'N');
    $('label[name=money_predict_le]').data('amountmoney', 0);
    $('#lst_ket_qua_cap_doi_mot').html('');
    $('#result_predict_cap_doi_mot').html('');
    $('label[name=money_predict_cap_doi_mot]').html('Số tiền :');
    $('label[name=money_predict_cap_doi_mot]').data('typemoney', 'N');
    $('label[name=money_predict_cap_doi_mot]').data('amountmoney', 0);
    $('#lst_ket_qua_cap_lien_tiep').html('');
    $('#result_predict_cap_lien_tiep').html('');
    $('label[name=money_predict_cap_lien_tiep]').html('Số tiền :');
    $('label[name=money_predict_cap_lien_tiep]').data('typemoney', 'N');
    $('label[name=money_predict_cap_lien_tiep]').data('amountmoney', 0);
}

function show_sample_detail(key){
    var obj_sample = localStorage.getItem(key);
    var arr_sample =[true,true,true,true,true,true,true,true];
    if(obj_sample != null){
        arr_sample = JSON.parse(obj_sample);
    }
    var arr_html_detail = [];
    for(var index =0;index < arr_sample.length;index++){
        if(arr_sample[index]){
            arr_html_detail.push('T' +(index+1));
        }
        else{
            arr_html_detail.push('N'+(index+1));
        }
    }
    $('label[name=detail-'+key +']').html(arr_html_detail.join('-'));
}

function chon_trung_sample(key,index){
    var obj_sample = localStorage.getItem(key);
    var arr_sample =[true,true,true,true,true,true,true,true];
    if(obj_sample != null){
        arr_sample = JSON.parse(obj_sample);
    }
    arr_sample[index] = true;    
    localStorage.setItem(key,JSON.stringify(arr_sample));
}

function chon_nguoc_sample(key,index){
    var obj_sample = localStorage.getItem(key);
    var arr_sample =[true,true,true,true,true,true,true,true];
    if(obj_sample != null){
        arr_sample = JSON.parse(obj_sample);
    }
    arr_sample[index] = false;    
    localStorage.setItem(key,JSON.stringify(arr_sample));
}

function set_default_sample_html(key){
    var default_sample = [true,true,true,true,true,true,true,true];
    var arr_sample_t_t_t_t = [];
    var obj_sample_t_t_t_t = localStorage.getItem(key);
    if(obj_sample_t_t_t_t != null){
        arr_sample_t_t_t_t = JSON.parse(obj_sample_t_t_t_t);    
    }
    else{
        arr_sample_t_t_t_t = default_sample;    
    }
    var html ='';
    for(var index =0;index < arr_sample_t_t_t_t.length;index++){
        html  +='<div id="predict-choosen-ca" class="predict-choosen predict-choosen-canclick">';
        if(arr_sample_t_t_t_t[index]){
            html += '   <div class="arrow-up" name="arrow_up" data-index="'+ index+'" data-localstoragekey="'+key+'"></div>';
            html += '   <div class="arrow-down not-choosen" name="arrow_down" data-index="'+ index+'" data-localstoragekey="'+key+'"></div>';
        }
        else{
            html += '   <div class="arrow-up not-choosen" name="arrow_up" data-index="'+ index +'" data-localstoragekey="'+key+'"></div>';
            html += '   <div class="arrow-down" name="arrow_down" data-index="'+ index +'" data-localstoragekey="'+key+'"></div>';
        }
        html += '</div>';
    }
    $('div[name=result-'+key +']').html(html);

    var arr_html_detail = [];
    var html_detail ='';
    for(var index =0;index < arr_sample_t_t_t_t.length;index++){
        if(arr_sample_t_t_t_t[index]){
            arr_html_detail.push('T' +(index+1));
        }
        else{
            arr_html_detail.push('N'+(index+1));
        }
    }
    html_detail = arr_html_detail.join('-');
    $('label[name=detail-'+key +']').html(html_detail);

    localStorage.setItem(key,JSON.stringify(arr_sample_t_t_t_t));
}

function btnExact_Click(){
    append_trung_or_truot(true);
    append_local_storage_trung_or_truot(true);
    predict_from_continue_result();
    append_trung_or_truot_remain();
    append_local_storage_trung_or_truot_remain();
    predict_chan.predict_next_step_series();
    predict_le.predict_next_step_series();
    predict_lien_tiep.predict_next_step_series();
    predict_tach_biet.predict_next_step_series();
    general_lib.show_total();
    show_total_ket_hop();
};

function btnFail_Click(){
    append_trung_or_truot(false);
    append_local_storage_trung_or_truot(false);
    predict_from_continue_result();
    append_trung_or_truot_remain();
    append_local_storage_trung_or_truot_remain();
    predict_chan.predict_next_step_series();
    predict_le.predict_next_step_series();
    predict_lien_tiep.predict_next_step_series();
    predict_tach_biet.predict_next_step_series();
    general_lib.show_total();
    show_total_ket_hop();
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
function append_trung_or_truot_remain() {
    var html_trung = '<div class="dudoan trung">T</div>';
    var html_truot = '<div class="dudoan truot">N</div>';
    var obj = localStorage.getItem('all_du_doan');
    var arr_du_doan = [];
    if (obj != null) {
        arr_du_doan = JSON.parse(obj);
    }

    var lgt_du_doan = arr_du_doan.length;
    if (lgt_du_doan > 0) {
        if (lgt_du_doan % 2 == 0) {
            if (arr_du_doan[lgt_du_doan - 1]) {
                $('#lst_ket_qua_chan').append(html_trung);
            }
            else {
                $('#lst_ket_qua_chan').append(html_truot);
            }
        }
        else {
            if (arr_du_doan[lgt_du_doan - 1]) {
                $('#lst_ket_qua_le').append(html_trung);
            }
            else {
                $('#lst_ket_qua_le').append(html_truot);
            }
        }
    }
    if (lgt_du_doan >= 2) {
        if (lgt_du_doan % 2 == 0) {
            if (arr_du_doan[lgt_du_doan - 1] == arr_du_doan[lgt_du_doan - 2]) {
                $('#lst_ket_qua_cap_doi_mot').append(html_trung);
            }
            else {
                $('#lst_ket_qua_cap_doi_mot').append(html_truot);
            }
        }
        else{
            if (arr_du_doan[lgt_du_doan - 1] == arr_du_doan[lgt_du_doan - 2]) {
                $('#lst_ket_qua_cap_lien_tiep').append(html_trung);
            }
            else {
                $('#lst_ket_qua_cap_lien_tiep').append(html_truot);
            }
        }
        // if (arr_du_doan[lgt_du_doan - 1] == arr_du_doan[lgt_du_doan - 2]) {
        //     $('#lst_ket_qua_cap_lien_tiep').append(html_trung);
        // }
        // else {
        //     $('#lst_ket_qua_cap_lien_tiep').append(html_truot);
        // }
    }

}

function append_local_storage_trung_or_truot(is_trung){
    var obj= localStorage.getItem('all_du_doan');
    var arr_du_doan =[];
    if(obj != null){
        arr_du_doan = JSON.parse(obj);   
    }    
    arr_du_doan.push(is_trung);
    localStorage.setItem('all_du_doan',JSON.stringify(arr_du_doan) );    
}

function append_local_storage_trung_or_truot_remain() {
    var obj = localStorage.getItem('all_du_doan');
    var arr_du_doan = [];
    if (obj != null) {
        arr_du_doan = JSON.parse(obj);
    }

    var lgt_du_doan = arr_du_doan.length;
    if (lgt_du_doan > 0) {
        if (lgt_du_doan % 2 == 0) {
            push_item_into_array_local_storage(global_key.key_du_doan_chan, arr_du_doan[lgt_du_doan - 1]);
        }
        else {
            push_item_into_array_local_storage(global_key.key_du_doan_le, arr_du_doan[lgt_du_doan - 1]);
        }
    }
    if (lgt_du_doan >= 2) {
        if (lgt_du_doan % 2 == 0) {
            if (arr_du_doan[lgt_du_doan - 1] == arr_du_doan[lgt_du_doan - 2]) {
                push_item_into_array_local_storage(global_key.key_du_doan_chan_le_tach_biet, true);
            }
            else {
                push_item_into_array_local_storage(global_key.key_du_doan_chan_le_tach_biet, false);
            }
        }
        else{
            if (arr_du_doan[lgt_du_doan - 1] == arr_du_doan[lgt_du_doan - 2]) {
                push_item_into_array_local_storage(global_key.key_du_doan_chan_le_lien_tiep, true);
            }
            else {
                push_item_into_array_local_storage(global_key.key_du_doan_chan_le_lien_tiep, false);
            }
        }
    }
}

function push_item_into_array_local_storage(key, item) {
    var obj_item = localStorage.getItem(key);
    var arr_item = [];
    if (obj_item != null) {
        arr_item = JSON.parse(obj_item);
    }
    arr_item.push(item);
    localStorage.setItem(key, JSON.stringify(arr_item));
}

function predict_from_continue_result(){
    var obj_du_doan = localStorage.getItem(global_key.key_du_doan);
    var arr_du_doan =[];
    if(obj_du_doan != null){
        arr_du_doan = JSON.parse(obj_du_doan);
    }
    if(arr_du_doan.length <3){
        return;
    }
    var curr_3_before_continous = localStorage.getItem(global_key.curr_3_before_continous) ;
    // Lấy ra kết quả đã dự đoán trước đó
    var obj_before_du_doan = localStorage.getItem(global_key.curr_predict_continous);
    var index_before_du_doan = localStorage.getItem(global_key.curr_index_continous);
    if (index_before_du_doan == null) {
        index_before_du_doan = 0;
    }
    else {
        index_before_du_doan = parseInt(index_before_du_doan);
    } 
    var arr_before_du_doan =[];
    var is_repeat_du_doan = true;
    if(curr_3_before_continous =='predict-t-f-f'){
        if(arr_du_doan[arr_du_doan.length -1] == true){
            show_predict_result_in_array([],0);
            localStorage.setItem(global_key.curr_predict_continous,JSON.stringify([]) );
            localStorage.setItem(global_key.curr_index_continous,0);
            localStorage.setItem(global_key.curr_3_before_continous,'predict-t-f-f-t');
            return;
        }
    }
    else if(curr_3_before_continous == 'predict-t-f-f-t'){
        if (arr_du_doan[arr_du_doan.length - 1] == true) {
            var arr_predict_special = [true, false, false, false, false, false, false, false];
            show_predict_result_in_array(arr_predict_special, 1);
            localStorage.setItem(global_key.curr_predict_continous, JSON.stringify(arr_predict_special) );
            localStorage.setItem(global_key.curr_index_continous,1);
            localStorage.setItem(global_key.curr_3_before_continous,'predict-t-f-f-t-t');
        }
        else {
            var arr_predict_special = [false, false, true, false, true, false, true, false];
            show_predict_result_in_array(arr_predict_special, 1);
            localStorage.setItem(global_key.curr_predict_continous, JSON.stringify(arr_predict_special) );
            localStorage.setItem(global_key.curr_index_continous,1);
            localStorage.setItem(global_key.curr_3_before_continous,'predict-t-f-f-t-f');
        }
        return;
    }
    else if(curr_3_before_continous == 'predict-f-f-f'){
        if(arr_du_doan[arr_du_doan.length -1] == true){
            show_predict_result_in_array([],0);
            localStorage.setItem(global_key.curr_predict_continous,JSON.stringify([]) );
            localStorage.setItem(global_key.curr_index_continous,0);
            localStorage.setItem(global_key.curr_3_before_continous,'predict-f-f-f-t');
            return;
        }
    }
    else if(curr_3_before_continous == 'predict-f-f-f-t'){
        if (arr_du_doan[arr_du_doan.length - 1] == true) {
            var arr_predict_special = [true, false, false, false, false, false, false, false];
            show_predict_result_in_array(arr_predict_special, 1);
            localStorage.setItem(global_key.curr_predict_continous, JSON.stringify(arr_predict_special));
            localStorage.setItem(global_key.curr_index_continous,1);
            localStorage.setItem(global_key.curr_3_before_continous,'predict-f-f-f-t-t');
        }
        else {
            var arr_predict_special = [false, false, true, false, true, false, true, false];
            show_predict_result_in_array(arr_predict_special, 1);
            localStorage.setItem(global_key.curr_predict_continous, JSON.stringify(arr_predict_special) );
            localStorage.setItem(global_key.curr_index_continous,1);
            localStorage.setItem(global_key.curr_3_before_continous,'predict-f-f-f-t-f');
        }
        return;
    }
    else{
        if(obj_before_du_doan != null){
            arr_before_du_doan = JSON.parse(obj_before_du_doan);
            if (index_before_du_doan < 7 && arr_before_du_doan.length > index_before_du_doan){
                if(arr_before_du_doan[index_before_du_doan ] != arr_du_doan[arr_du_doan.length -1]){
                    is_repeat_du_doan = false;
                }    
            }
        }
    }

    // Lấy ra 3 kết quả gần nhất
    var key = 'predict';

    if(is_repeat_du_doan){
        key += arr_du_doan[arr_du_doan.length -3] == true ? '-t' : '-f';
        key += arr_du_doan[arr_du_doan.length -2] == true ? '-t' : '-f';
        key += arr_du_doan[arr_du_doan.length -1] == true ? '-t' : '-f';

        var arr_predict =[];
        var html_predict = '';
        var type_money ='';
        if(key == 'predict-t-f-f'){
            arr_predict.push(false);
        }
        else if(key == 'predict-f-f-f'){
            arr_predict.push(false);
        }
        else{
            // Lấy ra kết quả dự đoán
            var obj_predict = localStorage.getItem(key);
            if(obj_predict != null){
                arr_predict = JSON.parse(obj_predict);
            }
        }

        show_predict_result_in_array(arr_predict, 0);
        localStorage.setItem(global_key.curr_predict_continous,JSON.stringify(arr_predict) );
        localStorage.setItem(global_key.curr_index_continous, 0);
        localStorage.setItem(global_key.curr_3_before_continous, key);

    }
    else{
        // Tăng lên 1 mức đầu tư
        index_before_du_doan = index_before_du_doan+1;
        show_predict_result_in_array(arr_before_du_doan, index_before_du_doan);
        localStorage.setItem(global_key.curr_predict_continous,JSON.stringify(arr_before_du_doan) );
        localStorage.setItem(global_key.curr_index_continous,index_before_du_doan);
    }
}

function show_predict_result_in_array(arr_predict,suggest_chose){
    if(arr_predict.length ==0){
        $('#result_predict_continuous').html('');
        $('label[name=money_predict_continuous]').html('Số tiền : 0');
        $('label[name=money_predict_continuous]').data('typemoney', 'N');
        $('label[name=money_predict_continuous]').data('amountmoney', 0);
        return;
    }

    var type_money = '';
    var html_predict='';
    for(var index =0;index < arr_predict.length;index++){
        if(arr_predict[index]){
            html_predict += '<div class="predict-choosen">';
            html_predict += '   <div class="arrow-up"></div>';
            if (index == suggest_chose) {
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
            if (index == suggest_chose) {
                type_money = 'N';
                html_predict += '<label style="border-bottom: 2px solid red;">N'+(index+1)+'</label>';
            }
            else{
                html_predict += '   N'+(index+1);
            }
            
            html_predict += '</div>';
        }
    }
    $('#result_predict_continuous').html(html_predict);
    $('label[name=money_predict_continuous]').html('Số tiền : ' + type_money + global_key.money[suggest_chose]);
    $('label[name=money_predict_continuous]').data('typemoney', type_money);
    $('label[name=money_predict_continuous]').data('amountmoney', global_key.money[suggest_chose]);
    //general_lib.calc_total(type_money,global_key.money[suggest_chose]);
}

function show_total_ket_hop(){
    var type_ket_qua_gan_nhat = $('label[name=money_predict_continuous]').data('typemoney');
    var money_ket_qua_gan_nhat =$('label[name=money_predict_continuous]').data('amountmoney');
    var parse_ket_qua_gan_nhat = parseFloat(money_ket_qua_gan_nhat);
    parse_ket_qua_gan_nhat = type_ket_qua_gan_nhat == 'T' ? parse_ket_qua_gan_nhat : (-1) * parse_ket_qua_gan_nhat;

    // Hiển thị kết quả chẵn + cặp từng đôi một
    var type_chan = $('label[name=money_predict_chan]').data('typemoney');
    var money_chan = $('label[name=money_predict_chan]').data('amountmoney');
    var parse_money_chan = parseFloat(money_chan);
    parse_money_chan = type_chan == 'T' ? parse_money_chan : (-1) * parse_money_chan;

    var type_le = $('label[name=money_predict_le]').data('typemoney');
    var money_le = $('label[name=money_predict_le]').data('amountmoney');
    var parse_money_le = parseFloat(money_le);
    parse_money_le = type_le == 'T' ? parse_money_le : (-1) * parse_money_le;

    var type_cap_doi_mot = $('label[name=money_predict_cap_doi_mot]').data('typemoney');
    var money_cap_doi_mot = $('label[name=money_predict_cap_doi_mot]').data('amountmoney');
    var parse_money_cap_doi_mot = parseFloat(money_cap_doi_mot);
    parse_money_cap_doi_mot = type_cap_doi_mot == 'T' ? parse_money_cap_doi_mot : (-1) * parse_money_cap_doi_mot;

    var type_cap_doi_lien_tiep = $('label[name=money_predict_cap_lien_tiep]').data('typemoney');
    var money_cap_doi_lien_tiep = $('label[name=money_predict_cap_lien_tiep]').data('amountmoney');
    var parse_money_cap_doi_lien_tiep = parseFloat(money_cap_doi_lien_tiep);
    parse_money_cap_doi_lien_tiep = type_cap_doi_lien_tiep == 'T' ? parse_money_cap_doi_lien_tiep : (-1) * parse_money_cap_doi_lien_tiep;

    // Tính tổng kết quả chẵn + cặp đôi một
    var html_trung = '<div class="dudoan trung">T</div>';
    var html_truot = '<div class="dudoan truot">N</div>';
    var html_khong = '<div class="dudoan khong">0</div>'
    if(parse_money_chan + parse_money_cap_doi_mot ==0){
        $('#chan_cong_cap_doi_mot').append(html_khong);
    }
    else if(parse_money_chan + parse_money_cap_doi_mot <0 ){
        $('#chan_cong_cap_doi_mot').append(html_truot);
        var arr_dd_chan_cong_cap_doi_mot = general_lib.get_array_from_local_storage(global_key.dd_chan_cong_cap_doi_mot);
        arr_dd_chan_cong_cap_doi_mot.push(false);
        localStorage.setItem(global_key.dd_chan_cong_cap_doi_mot,JSON.stringify(arr_dd_chan_cong_cap_doi_mot));
    }
    else{
        $('#chan_cong_cap_doi_mot').append(html_trung);
        var arr_dd_chan_cong_cap_doi_mot = general_lib.get_array_from_local_storage(global_key.dd_chan_cong_cap_doi_mot);
        arr_dd_chan_cong_cap_doi_mot.push(true);
        localStorage.setItem(global_key.dd_chan_cong_cap_doi_mot,JSON.stringify(arr_dd_chan_cong_cap_doi_mot));
    }

    // Tính tổng kết quả lẻ + cặp đôi liên tiếp
    if(parse_money_le + parse_money_cap_doi_lien_tiep == 0){
        $('#le_cong_cap_lien_tiep').append(html_khong);
    }
    else if(parse_money_le + parse_money_cap_doi_lien_tiep <0 ){
        $('#le_cong_cap_lien_tiep').append(html_truot);
    }
    else{
        $('#le_cong_cap_lien_tiep').append(html_trung);
    }

    // Tính tổng kết quả gần nhất + chẵn + cặp đôi một
    if(parse_ket_qua_gan_nhat + parse_money_chan + parse_money_cap_doi_mot ==0){
        $('#chung_chan_cong_cap_doi_mot').append(html_khong);
    }
    else if(parse_ket_qua_gan_nhat + parse_money_chan + parse_money_cap_doi_mot <0 ){
        $('#chung_chan_cong_cap_doi_mot').append(html_truot);
    }
    else{
        $('#chung_chan_cong_cap_doi_mot').append(html_trung);
    }

    // Tính tổng kết quả lẻ + cặp đôi liên tiếp
    if(parse_ket_qua_gan_nhat + parse_money_le + parse_money_cap_doi_lien_tiep == 0){
        $('#chung_le_cong_cap_lien_tiep').append(html_khong);
    }
    else if(parse_ket_qua_gan_nhat + parse_money_le + parse_money_cap_doi_lien_tiep <0 ){
        $('#chung_le_cong_cap_lien_tiep').append(html_truot);
    }
    else{
        $('#chung_le_cong_cap_lien_tiep').append(html_trung);
    }
}
function show_total_predict_next(total_frame_key,is_doi_key,buoc_truoc_key,el_show_predict,el_show_money,du_doan_lech){
    var arr_du_doan = general_lib.get_array_from_local_storage(total_frame_key);
    if(arr_du_doan.length <3){
        return;
    }
    var lgth_du_doan = arr_du_doan.length;
    var three_combine = arr_du_doan[lgth_du_doan - 3] == true ? 'T' :'N';
    three_combine += arr_du_doan[lgth_du_doan - 2] == true ? 'T' :'N' ;
    three_combine += arr_du_doan[lgth_du_doan - 1] == true ? 'T' :'N' ;

    var is_doi = false;
    if(localStorage.getItem(is_doi_key) == null || localStorage.getItem(is_doi_key) == false ){
        is_doi = false;
    }
    else{
        is_doi = true;
    }
    if(is_doi){
        var buoc_truoc = localStorage.getItem(buoc_truoc_key);
        if(buoc_truoc == null) return; 
        if(buoc_truoc == 'TNT'){
            if(arr_du_doan[lgth_du_doan -1] == true){
                var arr_predict_next = general_lib.get_array_from_local_storage('total-predict-t-f-t-t');
                show_total_series_predict_html(el_show_predict,el_show_money,arr_predict_next,du_doan_lech);
            }
            else{

            }
        }
    }
    else{

    }
}
function show_total_series_predict_html(element_id,element_money_id, arr_predict,curr_predict_index){
    var html_truot ='<div class="predict-choosen">   <div class="arrow-up"></div>[dd]</div>';
    var html_trung = '<div class="predict-choosen">   <div class="arrow-down"></div>[dd]</div>';
    var html ='';
    for(var index =0;index < arr_predict.length;index++){
        if(arr_predict[index]){
            html += html_trung.replace('[dd]','T' +(index + 1).toString() );
        }
        else{
            html += html_truot.replace('[dd]','N' +(index + 1).toString() );
        }
    }
}