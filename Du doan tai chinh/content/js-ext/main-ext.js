var global_key ={
    nine_frame_key_du_doan: 'nine_frame_key_predict',
    nine_frame_1st_frame: {
        ttt_key: 'nine_frame_1st_frame_ttt',
        ttf_key: 'nine_frame_1st_frame_ttf',
        tft_key: 'nine_frame_1st_frame_tft',
        tff_key: 'nine_frame_1st_frame_tff',
        ftt_key: 'nine_frame_1st_frame_ftt',
        ftf_key: 'nine_frame_1st_frame_ftf',
        fft_key: 'nine_frame_1st_frame_fft',
        fff_key: 'nine_frame_1st_frame_fff'
    },
    nine_frame_2st_frame: {
        ttt_key: 'nine_frame_2st_frame_ttt',
        ttf_key: 'nine_frame_2st_frame_ttf',
        tft_key: 'nine_frame_2st_frame_tft',
        tff_key: 'nine_frame_2st_frame_tff',
        ftt_key: 'nine_frame_2st_frame_ftt',
        ftf_key: 'nine_frame_2st_frame_ftf',
        fft_key: 'nine_frame_2st_frame_fft',
        fff_key: 'nine_frame_2st_frame_fff'
    },
    nine_frame_3st_frame: {
        ttt_key: 'nine_frame_3st_frame_ttt',
        ttf_key: 'nine_frame_3st_frame_ttf',
        tft_key: 'nine_frame_3st_frame_tft',
        tff_key: 'nine_frame_3st_frame_tff',
        ftt_key: 'nine_frame_3st_frame_ftt',
        ftf_key: 'nine_frame_3st_frame_ftf',
        fft_key: 'nine_frame_3st_frame_fft',
        fff_key: 'nine_frame_3st_frame_fff'
    },
    nine_frame_4st_frame: {
        ttt_key: 'nine_frame_4st_frame_ttt',
        ttf_key: 'nine_frame_4st_frame_ttf',
        tft_key: 'nine_frame_4st_frame_tft',
        tff_key: 'nine_frame_4st_frame_tff',
        ftt_key: 'nine_frame_4st_frame_ftt',
        ftf_key: 'nine_frame_4st_frame_ftf',
        fft_key: 'nine_frame_4st_frame_fft',
        fff_key: 'nine_frame_4st_frame_fff'
    },
    nine_frame_5st_frame: {
        ttt_key: 'nine_frame_5st_frame_ttt',
        ttf_key: 'nine_frame_5st_frame_ttf',
        tft_key: 'nine_frame_5st_frame_tft',
        tff_key: 'nine_frame_5st_frame_tff',
        ftt_key: 'nine_frame_5st_frame_ftt',
        ftf_key: 'nine_frame_5st_frame_ftf',
        fft_key: 'nine_frame_5st_frame_fft',
        fff_key: 'nine_frame_5st_frame_fff'
    },
    nine_frame_6st_frame: {
        ttt_key: 'nine_frame_6st_frame_ttt',
        ttf_key: 'nine_frame_6st_frame_ttf',
        tft_key: 'nine_frame_6st_frame_tft',
        tff_key: 'nine_frame_6st_frame_tff',
        ftt_key: 'nine_frame_6st_frame_ftt',
        ftf_key: 'nine_frame_6st_frame_ftf',
        fft_key: 'nine_frame_6st_frame_fft',
        fff_key: 'nine_frame_6st_frame_fff'
    },
    nine_frame_7st_frame: {
        ttt_key: 'nine_frame_7st_frame_ttt',
        ttf_key: 'nine_frame_7st_frame_ttf',
        tft_key: 'nine_frame_7st_frame_tft',
        tff_key: 'nine_frame_7st_frame_tff',
        ftt_key: 'nine_frame_7st_frame_ftt',
        ftf_key: 'nine_frame_7st_frame_ftf',
        fft_key: 'nine_frame_7st_frame_fft',
        fff_key: 'nine_frame_7st_frame_fff'
    },
    nine_frame_8st_frame: {
        ttt_key: 'nine_frame_8st_frame_ttt',
        ttf_key: 'nine_frame_8st_frame_ttf',
        tft_key: 'nine_frame_8st_frame_tft',
        tff_key: 'nine_frame_8st_frame_tff',
        ftt_key: 'nine_frame_8st_frame_ftt',
        ftf_key: 'nine_frame_8st_frame_ftf',
        fft_key: 'nine_frame_8st_frame_fft',
        fff_key: 'nine_frame_8st_frame_fff'
    },
    nine_frame_9st_frame: {
        ttt_key: 'nine_frame_9st_frame_ttt',
        ttf_key: 'nine_frame_9st_frame_ttf',
        tft_key: 'nine_frame_9st_frame_tft',
        tff_key: 'nine_frame_9st_frame_tff',
        ftt_key: 'nine_frame_9st_frame_ftt',
        ftf_key: 'nine_frame_9st_frame_ftf',
        fft_key: 'nine_frame_9st_frame_fft',
        fff_key: 'nine_frame_9st_frame_fff'
    }
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
    localStorage.setItem(global_key.nine_frame_6st_frame.ftf_key, JSON.stringify([true, false, false, true, true, false, false, true, true]));
    localStorage.setItem(global_key.nine_frame_6st_frame.fft_key, JSON.stringify([false, true, true, false, false, true, true, false, false]));
    localStorage.setItem(global_key.nine_frame_6st_frame.fff_key, JSON.stringify([false, false, true, true, false, false, true, true, false]));
} 