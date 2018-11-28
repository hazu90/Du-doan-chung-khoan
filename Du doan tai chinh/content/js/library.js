var general_lib ={
    get_array_from_local_storage:function(key){
        var str_obj = localStorage.getItem(key);
        var arr_value=[];
        if(str_obj != null){
            arr_value = JSON.parse(str_obj);
        }
        return arr_value;
    },
    calc_total:function(type_money,mney){
        var total_N = parseFloat(localStorage.getItem('total_N')) ;
        var total_T = parseFloat(localStorage.getItem('total_T'));
        if(type_money == 'T'){
            total_N += mney;
            localStorage.setItem('total_N',total_N);
        }
        else{
            total_T += mney;
            localStorage.setItem('total_T',total_T);
        }
    },
    show_total: function () {
        //var total_N = parseFloat(localStorage.getItem('total_N')).toFixed(2);;
        //var total_T = parseFloat(localStorage.getItem('total_T')).toFixed(2);;

        var total_N = 0;
        var total_T = 0;

        var type_money_all = $('label[name=money_predict_continuous]').data('typemoney');
        var money_all = parseFloat($('label[name=money_predict_continuous]').data('amountmoney'));
        if (type_money_all == 'N') {
            total_N += money_all;
        }
        else {
            total_T += money_all;
        }

        var type_money_chan = $('label[name=money_predict_chan]').data('typemoney');
        var money_chan = parseFloat($('label[name=money_predict_chan]').data('amountmoney'));
        if (type_money_chan == 'N') {
            total_N += money_chan;
        }
        else {
            total_T += money_chan;
        }
        var type_money_le = $('label[name=money_predict_le]').data('typemoney');
        var money_le = parseFloat($('label[name=money_predict_le]').data('amountmoney'));
        if (type_money_le == 'N') {
            total_N += money_le;
        }
        else {
            total_T += money_le;
        }

        var type_money_tach_biet = $('label[name=money_predict_cap_doi_mot]').data('typemoney');
        var money_tach_biet = parseFloat($('label[name=money_predict_cap_doi_mot]').data('amountmoney'));
        if (type_money_tach_biet == 'N') {
            total_N += money_tach_biet;
        }
        else {
            total_T += money_tach_biet;
        }

        var type_money_lien_tiep = $('label[name=money_predict_cap_lien_tiep]').data('typemoney');
        var money_lien_tiep = parseFloat($('label[name=money_predict_cap_lien_tiep]').data('amountmoney'));
        if (type_money_lien_tiep == 'N') {
            total_N += money_lien_tiep;
        }
        else {
            total_T += money_lien_tiep;
        }

        $('#totalN').html(total_N.toFixed(2));
        $('#totalT').html(total_T.toFixed(2));
        if (total_N > total_T) {
            $('#totalCompare').html('N '+ ((total_N - total_T)/4).toFixed(2));
        }
        else {
            $('#totalCompare').html('T ' + ((total_T - total_N)/4).toFixed(2));
        }
    },
    show_total_ext: function () {
        //var total_N = parseFloat(localStorage.getItem('total_N')).toFixed(2);;
        //var total_T = parseFloat(localStorage.getItem('total_T')).toFixed(2);;

        var total_N = 0;
        var total_T = 0;

        var type_money = $('label[name=money_predict_1st_2st_3st_frame]').data('typemoney');
        var mm = parseFloat($('label[name=money_predict_1st_2st_3st_frame]').data('amountmoney'));
        if (type_money == 'N') {
            total_N += isNaN(mm) ? 0 : mm;
        }
        else {
            total_T += isNaN(mm) ? 0 : mm;
        }

        type_money = $('label[name=money_predict_2st_3st_4st_frame]').data('typemoney');
        mm = parseFloat($('label[name=money_predict_2st_3st_4st_frame]').data('amountmoney'));
        if (type_money == 'N') {
            total_N += isNaN(mm) ? 0 : mm;
        }
        else {
            total_T += isNaN(mm) ? 0 : mm;
        }

        type_money = $('label[name=money_predict_3st_4st_5st_frame]').data('typemoney');
        mm = parseFloat($('label[name=money_predict_3st_4st_5st_frame]').data('amountmoney'));
        if (type_money == 'N') {
            total_N += isNaN(mm) ? 0 : mm;
        }
        else {
            total_T += isNaN(mm) ? 0 : mm;
        }

        type_money = $('label[name=money_predict_4st_5st_6st_frame]').data('typemoney');
        mm = parseFloat($('label[name=money_predict_4st_5st_6st_frame]').data('amountmoney'));
        if (type_money == 'N') {
            total_N += isNaN(mm) ? 0 : mm;
        }
        else {
            total_T += isNaN(mm) ? 0 : mm;
        }

        type_money = $('label[name=money_predict_5st_6st_7st_frame]').data('typemoney');
        mm = parseFloat($('label[name=money_predict_5st_6st_7st_frame]').data('amountmoney'));
        if (type_money == 'N') {
            total_N += isNaN(mm) ? 0 : mm;
        }
        else {
            total_T += isNaN(mm) ? 0 : mm;
        }

        type_money = $('label[name=money_predict_6st_7st_8st_frame]').data('typemoney');
        mm = parseFloat($('label[name=money_predict_6st_7st_8st_frame]').data('amountmoney'));
        if (type_money == 'N') {
            total_N += isNaN(mm) ? 0 : mm;
        }
        else {
            total_T += isNaN(mm) ? 0 : mm;
        }

        type_money = $('label[name=money_predict_7st_8st_9st_frame]').data('typemoney');
        mm = parseFloat($('label[name=money_predict_7st_8st_9st_frame]').data('amountmoney'));
        if (type_money == 'N') {
            total_N += isNaN(mm) ? 0 : mm;
        }
        else {
            total_T += isNaN(mm) ? 0 : mm;
        }

        type_money = $('label[name=money_predict_8st_9st_1st_frame]').data('typemoney');
        mm = parseFloat($('label[name=money_predict_8st_9st_1st_frame]').data('amountmoney'));
        if (type_money == 'N') {
            total_N += isNaN(mm) ? 0 : mm;
        }
        else {
            total_T += isNaN(mm) ? 0 : mm;
        }

        type_money = $('label[name=money_predict_9st_1st_2st_frame]').data('typemoney');
        mm = parseFloat($('label[name=money_predict_9st_1st_2st_frame]').data('amountmoney'));
        if (type_money == 'N') {
            
            total_N += isNaN(mm) ? 0 : mm ;
        }
        else {
            total_T += isNaN(mm) ? 0 : mm;
        }


        $('#totalN').html(total_N.toFixed(2));
        $('#totalT').html(total_T.toFixed(2));
        if (total_N > total_T) {
            $('#totalCompare').html('N ' + ((total_N - total_T) / 4).toFixed(2));
        }
        else {
            $('#totalCompare').html('T ' + ((total_T - total_N) / 4).toFixed(2));
        }
    },
    show_predict:function(combine_frame,arr_predict,suggest_chose,is_calc_predict){
        var el_show_ket_qua = $('#'+combine_frame.view_du_doan_next_id);
        var el_show_tien =$('label[name='+ combine_frame.view_show_money_name +']'); 
        if(arr_predict.length ==0){
            el_show_ket_qua.html('');
            el_show_tien.html('Số tiền : 0');
            el_show_tien.data('typemoney','N');
            el_show_tien.data('amountmoney',0);
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
        el_show_ket_qua.html(html_predict);
        if(is_calc_predict){
            el_show_tien.html('Số tiền : ' + type_money + global_key.money[suggest_chose]);
            el_show_tien.data('typemoney', type_money);
            el_show_tien.data('amountmoney', global_key.money[suggest_chose]);
        }
        else{
            el_show_tien.html('Số tiền : 0');
            el_show_tien.data('typemoney', 'N');
            el_show_tien.data('amountmoney', 0);
        }
    },
    set_current_data : function(combine_frame,arr_curr_predict,curr_index,curr_3_before){
        localStorage.setItem(combine_frame.curr_predicts,JSON.stringify(arr_curr_predict));
        localStorage.setItem(combine_frame.curr_index,curr_index);
        localStorage.setItem(combine_frame.curr_3_before,curr_3_before);
    },
    set_current_data_without_curr_3_before_continous : function(combine_frame,arr_curr_predict,curr_index){
        localStorage.setItem(combine_frame.curr_predicts,JSON.stringify(arr_curr_predict));
        localStorage.setItem(combine_frame.curr_index,curr_index);
    }
};