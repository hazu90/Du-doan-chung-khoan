var global_key ={
    nine_frame_key_du_doan :'nine_frame_key_predict',
    nine_frame_1st_frame_ttt_key :'nine_frame_1st_frame_ttt',
    nine_frame_1st_frame_ttf_key :'nine_frame_1st_frame_ttf',
    nine_frame_1st_frame_tft_key :'nine_frame_1st_frame_tft',
    nine_frame_1st_frame_tff_key :'nine_frame_1st_frame_tff',
    nine_frame_1st_frame_ftt_key :'nine_frame_1st_frame_ftt',
    nine_frame_1st_frame_ftf_key :'nine_frame_1st_frame_ftf',
    nine_frame_1st_frame_fft_key :'nine_frame_1st_frame_fft',
    nine_frame_1st_frame_fff_key :'nine_frame_1st_frame_fff',
    nine_frame_2st_frame_ttt_key :'nine_frame_2st_frame_ttt',
    nine_frame_2st_frame_ttf_key :'nine_frame_2st_frame_ttf',
    nine_frame_2st_frame_tft_key :'nine_frame_2st_frame_tft',
    nine_frame_2st_frame_tff_key :'nine_frame_2st_frame_tff',
    nine_frame_2st_frame_ftt_key :'nine_frame_2st_frame_ftt',
    nine_frame_2st_frame_ftf_key :'nine_frame_2st_frame_ftf',
    nine_frame_2st_frame_fft_key :'nine_frame_2st_frame_fft',
    nine_frame_2st_frame_fff_key :'nine_frame_2st_frame_fff',   
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
});

function btnExact_Click(){
    append_trung_or_truot(true);
};

function btnFail_Click(){
    append_trung_or_truot(false);
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