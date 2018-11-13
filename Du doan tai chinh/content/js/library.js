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
            $('#totalCompare').html((total_N - total_T).toFixed(2));
        }
        else {
            $('#totalCompare').html((total_T - total_N).toFixed(2));
        }
    }
};