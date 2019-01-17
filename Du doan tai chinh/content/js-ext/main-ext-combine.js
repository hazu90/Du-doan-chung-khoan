var global_key_combine = {
    key_du_doan: 'all_du_doan_combine_4k_9k',
    key_du_doan_chan: 'chan_all_du_doan_combine_4k_9k',
    key_du_doan_le: 'le_all_du_doan_combine_4k_9k',
    key_du_doan_chan_le_lien_tiep: 'lien_tiep_all_du_doan_combine_4k_9k',
    key_du_doan_chan_le_tach_biet :'tach_biet_all_du_doan_combine_4k_9k',
    money :[1.05,3.21,7.64,16.74,35.41,74,153,315],
    curr_predict_continous:'curr_predict_continous_combine_4k_9k',
    curr_index_continous : 'curr_index_continous_combine_4k_9k',
    curr_3_before_continous :'curr_3_before_continous_combine_4k_9k'
};

var show_combine_result ={
    key_local :{
        frame_1st :{
            predict :'three_frame_combine_1st_2st_3st_du_doan_next',
            stt :'1'
        },
        frame_2st :{
            predict :'three_frame_combine_2st_3st_4st_du_doan_next',
            stt :'2'
        },
        frame_3st :{
            predict :'three_frame_combine_3st_4st_5st_du_doan_next',
            stt :'3'
        },
        frame_4st :{
            predict :'three_frame_combine_4st_5st_6st_du_doan_next',
            stt :'4'
        },
        frame_5st :{
            predict :'three_frame_combine_5st_6st_7st_du_doan_next',
            stt :'5'
        },
        frame_6st :{
            predict :'three_frame_combine_6st_7st_8st_du_doan_next',
            stt :'6'
        },
        frame_7st :{
            predict :'three_frame_combine_7st_8st_9st_du_doan_next',
            stt :'7'
        },
        frame_8st :{
            predict :'three_frame_combine_8st_9st_1st_du_doan_next',
            stt :'8'
        },
        frame_9st :{
            predict :'three_frame_combine_9st_1st_2st_du_doan_next',
            stt :'9'
        }
    },
    show :function(){
        var arr_frame =[show_combine_result.key_local.frame_1st,
            show_combine_result.key_local.frame_2st,
            show_combine_result.key_local.frame_3st,
            show_combine_result.key_local.frame_4st,
            show_combine_result.key_local.frame_5st,
            show_combine_result.key_local.frame_6st,
            show_combine_result.key_local.frame_7st,
            show_combine_result.key_local.frame_8st,
            show_combine_result.key_local.frame_9st
        ];
        for (var index = 0; index < arr_frame.length; index++){
            show_combine_result.append_show_ext(arr_frame[index]);
            predict_normal_combine.predict_next_step_series(arr_frame[index]);
            predict_chan_combine.predict_next_step_series(arr_frame[index]);
            predict_le_combine.predict_next_step_series(arr_frame[index]);
            predict_lien_tiep_combine.predict_next_step_series(arr_frame[index]);
            predict_tach_biet_combine.predict_next_step_series(arr_frame[index]);
            show_combine_result.show_total(arr_frame[index]);
        }     
    },
    append_show_ext: function (frame_combine) {
        var html_trung = '<div class="dudoan trung">T</div>';
        var html_truot = '<div class="dudoan truot">N</div>';
        var arr = general_lib.get_array_from_local_storage(frame_combine.predict);
        var lgt_arr = arr.length;
        if (lgt_arr > 0) {
            if (arr[lgt_arr - 1]) {
                $('#combine_4k_9k_' + frame_combine.stt + 'st_frame').append(html_trung);
            }
            else {
                $('#combine_4k_9k_' + frame_combine.stt + 'st_frame').append(html_truot);
            }
        }
    },
    show_total: function (frame_combine) {
        var total_N = 0;
        var total_T = 0;

        var type_money_all = $('label[name=money_predict_continuous_' + frame_combine.stt + ']').data('typemoney');
        var money_all = parseFloat($('label[name=money_predict_continuous_' + frame_combine.stt + ']').data('amountmoney'));
        if (type_money_all == 'N') {
            total_N += (isNaN(money_all) ? 0 : money_all);
        }
        else {
            total_T += (isNaN(money_all) ? 0 : money_all);
        }

        var type_money_chan = $('label[name=money_predict_chan_combine_' + frame_combine.stt + ']').data('typemoney');
        var money_chan = parseFloat($('label[name=money_predict_chan_combine_' + frame_combine.stt + ']').data('amountmoney'));
        if (type_money_chan == 'N') {
            total_N += (isNaN(money_chan) ? 0 : money_chan);
        }
        else {
            total_T += (isNaN(money_chan) ? 0 : money_chan);
        }
        var type_money_le = $('label[name=money_predict_le_combine_' + frame_combine.stt + ']').data('typemoney');
        var money_le = parseFloat($('label[name=money_predict_le_combine_' + frame_combine.stt + ']').data('amountmoney'));
        if (type_money_le == 'N') {
            total_N += (isNaN(money_le) ? 0 : money_le);
        }
        else {
            total_T += (isNaN(money_le) ? 0 : money_le);
        }

        var type_money_tach_biet = $('label[name=money_predict_cap_doi_mot_' + frame_combine.stt + ']').data('typemoney');
        var money_tach_biet = parseFloat($('label[name=money_predict_cap_doi_mot_' + frame_combine.stt + ']').data('amountmoney'));
        if (type_money_tach_biet == 'N') {
            total_N += (isNaN(money_tach_biet) ? 0 : money_tach_biet);
        }
        else {
            total_T += (isNaN(money_tach_biet) ? 0 : money_tach_biet);
        }

        var type_money_lien_tiep = $('label[name=money_predict_cap_lien_tiep_' + frame_combine.stt + ']').data('typemoney');
        var money_lien_tiep = parseFloat($('label[name=money_predict_cap_lien_tiep_' + frame_combine.stt + ']').data('amountmoney'));
        if (type_money_lien_tiep == 'N') {
            total_N += (isNaN(money_lien_tiep) ? 0 : money_lien_tiep);
        }
        else {
            total_T += (isNaN(money_lien_tiep) ? 0 : money_lien_tiep);
        }
        if (total_N > total_T) {
            $('#result_4k_9k_' + frame_combine.stt + 'st_frame').append('N ;');
        }
        else if (total_N == total_T) {
            $('#result_4k_9k_' + frame_combine.stt + 'st_frame').append('0 ;');
        }
        else {
            $('#result_4k_9k_' + frame_combine.stt + 'st_frame').append('T ;');
        }
    }
};