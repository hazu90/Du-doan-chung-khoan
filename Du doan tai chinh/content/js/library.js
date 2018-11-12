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
    show_total:function(){
        var total_N = parseFloat(localStorage.getItem('total_N')).toFixed(2); ;
        var total_T = parseFloat(localStorage.getItem('total_T')).toFixed(2);;

        $('#totalN').html(parseFloat(localStorage.getItem('total_N')).toFixed(2));
        $('#totalT').html(parseFloat(localStorage.getItem('total_T')).toFixed(2));
        if(total_N > total_T){
            $('#totalCompare').html(total_N - total_T);
        }
        else{
            $('#totalCompare').html(total_T - total_N);
        }
        
    }
};