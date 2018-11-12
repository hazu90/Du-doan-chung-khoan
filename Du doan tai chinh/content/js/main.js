var global_key = {
    key_du_doan : 'all_du_doan',
    money :[1.05,3.21,7.64,16.74,35.41,74,153,315],
    curr_predict_continous:'curr_predict_continous',
    curr_index_continous : 'curr_index_continous',
    curr_3_before_continous :'curr_3_before_continous'
};
$(document).ready(function(){
    $('#btnExact').off('click').on('click',btnExact_Click);
    $('#btnFail').off('click').on('click',btnFail_Click);      
    $('#btnClear').off('click').on('click',function(){
        localStorage.setItem('all_du_doan',JSON.stringify([]));
        $('#lst_ket_qua').html('');
    });
    // Lấy ra danh sách các dự đoán từ trước của người dùng
    var obj= localStorage.getItem(global_key.key_du_doan);
    var arr_du_doan =[];
    if(obj != null){
        arr_du_doan = JSON.parse(obj);   
    }
    
    if(arr_du_doan.length > 0){
        for (var index = 0; index < arr_du_doan.length; index++) {
            append_trung_or_truot(arr_du_doan[index]);
        }
    }
    set_default_sample_html('predict-t-t-t');
    set_default_sample_html('predict-t-t-f');
    set_default_sample_html('predict-t-f-t');
    set_default_sample_html('predict-t-f-f');
    set_default_sample_html('predict-f-t-t');
    set_default_sample_html('predict-f-t-f');
    set_default_sample_html('predict-f-f-t');
    set_default_sample_html('predict-f-f-f');
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
};

function btnFail_Click(){
    append_trung_or_truot(false);
    append_local_storage_trung_or_truot(false);
    predict_from_continue_result();
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
    var obj= localStorage.getItem('all_du_doan');
    var arr_du_doan =[];
    if(obj != null){
        arr_du_doan = JSON.parse(obj);   
    }    
    arr_du_doan.push(is_trung);
    localStorage.setItem('all_du_doan',JSON.stringify(arr_du_doan) );    
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
    var curr_3_before_continous = global_key.curr_3_before_continous;
    // Lấy ra kết quả đã dự đoán trước đó
    var obj_before_du_doan = localStorage.getItem(global_key.curr_predict_continous);
    var index_before_du_doan = localStorage.getItem(global_key.curr_index_continous);
    if(index_before_du_doan == null) index_before_du_doan =0;
    else index_before_du_doan = parseInt(index_before_du_doan);
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
        if(arr_du_doan[arr_du_doan.length -1] == true){
            show_predict_result_in_array([true,false,false,false,false,false,false,false],1);
            localStorage.setItem(global_key.curr_predict_continous,JSON.stringify([true,false,false,false,false,false,false,false]) );
            localStorage.setItem(global_key.curr_index_continous,1);
            localStorage.setItem(global_key.curr_3_before_continous,'predict-t-f-f-t-t');
        }
        else{
            show_predict_result_in_array([false,false,true,false,true,false,true,false],1);
            localStorage.setItem(global_key.curr_predict_continous,JSON.stringify([false,false,true,false,true,false,true,false]) );
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
        if(arr_du_doan[arr_du_doan.length -1] == true){
            show_predict_result_in_array([true,false,false,false,false,false,false,false],1);
            localStorage.setItem(global_key.curr_predict_continous,JSON.stringify([true,false,false,false,false,false,false,false]) );
            localStorage.setItem(global_key.curr_index_continous,1);
            localStorage.setItem(global_key.curr_3_before_continous,'predict-f-f-f-t-t');
        }
        else{
            show_predict_result_in_array([false,false,true,false,true,false,true,false],1);
            localStorage.setItem(global_key.curr_predict_continous,JSON.stringify([false,false,true,false,true,false,true,false]) );
            localStorage.setItem(global_key.curr_index_continous,1);
            localStorage.setItem(global_key.curr_3_before_continous,'predict-f-f-f-t-f');
        }
        return;
    }
    else{
        if(obj_before_du_doan != null){
            arr_before_du_doan = JSON.parse(obj_before_du_doan);
            if(arr_before_du_doan.length > index_before_du_doan+1){
                if(arr_before_du_doan[index_before_du_doan +1] != arr_du_doan[arr_du_doan.length -1]){
                    is_repeat_du_doan = false;
                }    
            }
        }
    }
    
    if(is_repeat_du_doan){
        // Lấy ra 3 kết quả gần nhất
        var key ='predict';
        key += arr_du_doan[arr_du_doan.length -3] == true ? '-t' : '-f';
        key += arr_du_doan[arr_du_doan.length -2] == true ? '-t' : '-f';
        key += arr_du_doan[arr_du_doan.length -1] == true ? '-t' : '-f';

        var arr_predict =[];
        var html_predict = '';
        var type_money ='';
        if(key == 'predict-t-f-f'){
            arr_predict.push(false);
            html_predict += '<div class="predict-choosen">';
            html_predict += '   <div class="arrow-up"></div>';
            html_predict += '<label style="border-bottom: 2px solid red;">N1</label>';
            html_predict += '</div>';

            type_money = 'N'
        }
        else if(key == 'predict-f-f-f'){
            arr_predict.push(false);
            html_predict += '<div class="predict-choosen">';
            html_predict += '   <div class="arrow-up"></div>';
            html_predict += '<label style="border-bottom: 2px solid red;">N1</label>';
            html_predict += '</div>';

            type_money = 'N';
        }
        else{
            // Lấy ra kết quả dự đoán
            var obj_predict = localStorage.getItem(key);
                    
            if(obj_predict != null){
                arr_predict = JSON.parse(obj_predict);
            }

            for(var index =0;index < arr_predict.length;index++){
                if(arr_predict[index]){
                    html_predict += '<div class="predict-choosen">';
                    html_predict += '   <div class="arrow-up"></div>';
                    if(index ==0){
                        type_money ='T';
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
                    if(index ==0){
                        type_money ='N';
                        html_predict += '<label style="border-bottom: 2px solid red;">N'+(index+1)+'</label>';
                    }
                    else{
                        html_predict += '   N'+(index+1);
                    }
                    
                    html_predict += '</div>';
                }
            }
        }
        
        $('#result_predict_continuous').html(html_predict);
        $('label[name=money_predict_continuous]').html('Số tiền : '+ type_money + global_key.money[0]);


        localStorage.setItem(global_key.curr_predict_continous,JSON.stringify(arr_predict) );
        localStorage.setItem(global_key.curr_index_continous,0);

    }
    else{
        // Lấy ra 3 kết quả gần nhất
        var html_predict = '';
        index_before_du_doan = index_before_du_doan+1;
        for(var index =0;index < arr_before_du_doan.length;index++){
            if(arr_before_du_doan[index]){
                html_predict += '<div class="predict-choosen">';
                html_predict += '   <div class="arrow-up"></div>';
                if(index ==index_before_du_doan){
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
                if(index ==index_before_du_doan){
                    html_predict += '<label style="border-bottom: 2px solid red;">N'+(index+1)+'</label>';
                }
                else{
                    html_predict += '   N'+(index+1);
                }
                
                html_predict += '</div>';
            }
        }
        $('#result_predict_continuous').html(html_predict);
        $('label[name=money_predict_continuous]').html('Số tiền : ' + global_key.money[index_before_du_doan]);


        localStorage.setItem(global_key.curr_predict_continous,JSON.stringify(arr_before_du_doan) );
        localStorage.setItem(global_key.curr_index_continous,index_before_du_doan);
    }
}

function show_predict_result_in_array(arr_predict,suggest_chose){
    if(arr_predict.length ==0){
        $('#result_predict_continuous').html('');
        $('label[name=money_predict_continuous]').html('Số tiền : 0');
        return;
    }

    var html_predict='';
    for(var index =0;index < arr_predict.length;index++){
        if(arr_predict[index]){
            html_predict += '<div class="predict-choosen">';
            html_predict += '   <div class="arrow-up"></div>';
            if(index ==suggest_chose){
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
            if(index ==suggest_chose){
                html_predict += '<label style="border-bottom: 2px solid red;">N'+(index+1)+'</label>';
            }
            else{
                html_predict += '   N'+(index+1);
            }
            
            html_predict += '</div>';
        }
    }
    $('#result_predict_continuous').html(html_predict);
    $('label[name=money_predict_continuous]').html('Số tiền : ' + global_key.money[suggest_chose]);
}