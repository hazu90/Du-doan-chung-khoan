var predict_normal_combine={
    storage_name: {
        key_du_doan: 'all_du_doan_combine_4k_9k',
        curr_predict_continous: 'curr_predict_continous_combine_4k_9k',
        curr_3_before_continous: 'curr_3_before_continous_combine_4k_9k',
        curr_index_before_du_doan: 'curr_index_continous_combine_4k_9k'
    },
    predict_next_step_series: function (frame_combine) {
        var obj_du_doan = localStorage.getItem(frame_combine.predict);
        var arr_du_doan = [];
        if (obj_du_doan != null) {
            arr_du_doan = JSON.parse(obj_du_doan);
        }
        if (arr_du_doan.length < 3) {
            return;
        }
        var curr_3_before_continous = localStorage.getItem(predict_normal_combine.storage_name.curr_3_before_continous + frame_combine.stt);
        // Lấy ra kết quả đã dự đoán trước đó
        var obj_before_du_doan = localStorage.getItem(predict_normal_combine.storage_name.curr_predict_continous + frame_combine.stt);
        var index_before_du_doan = localStorage.getItem(predict_normal_combine.storage_name.curr_index_continous + frame_combine.stt);
        if (index_before_du_doan == null) {
            index_before_du_doan = 0;
        }
        else {
            index_before_du_doan = parseInt(index_before_du_doan);
        }
        var arr_before_du_doan = [];
        var is_repeat_du_doan = true;
        if (curr_3_before_continous == 'predict-t-f-f') {
            if (arr_du_doan[arr_du_doan.length - 1] == true) {
                predict_normal_combine.show_predict_result_in_array(frame_combine,[], 0);
                localStorage.setItem(predict_normal_combine.storage_name.curr_predict_continous + frame_combine.stt, JSON.stringify([]));
                localStorage.setItem(predict_normal_combine.storage_name.curr_index_continous + frame_combine.stt, 0);
                localStorage.setItem(predict_normal_combine.storage_name.curr_3_before_continous + frame_combine.stt, 'predict-t-f-f-t');
                return;
            }
        }
        else if (curr_3_before_continous == 'predict-t-f-f-t') {
            if (arr_du_doan[arr_du_doan.length - 1] == true) {
                var arr_predict_special = [true, false, false, false, false, false, false, false];
                predict_normal_combine.show_predict_result_in_array(frame_combine,arr_predict_special, 1);
                localStorage.setItem(predict_normal_combine.storage_name.curr_predict_continous + frame_combine.stt, JSON.stringify(arr_predict_special));
                localStorage.setItem(predict_normal_combine.storage_name.curr_index_continous + frame_combine.stt, 1);
                localStorage.setItem(predict_normal_combine.storage_name.curr_3_before_continous + frame_combine.stt, 'predict-t-f-f-t-t');
            }
            else {
                var arr_predict_special = [false, false, true, false, true, false, true, false];
                predict_normal_combine.show_predict_result_in_array(frame_combine,arr_predict_special, 1);
                localStorage.setItem(predict_normal_combine.storage_name.curr_predict_continous + frame_combine.stt, JSON.stringify(arr_predict_special));
                localStorage.setItem(predict_normal_combine.storage_name.curr_index_continous + frame_combine.stt, 1);
                localStorage.setItem(predict_normal_combine.storage_name.curr_3_before_continous + frame_combine.stt, 'predict-t-f-f-t-f');
            }
            return;
        }
        else if (curr_3_before_continous == 'predict-f-f-f') {
            if (arr_du_doan[arr_du_doan.length - 1] == true) {
                predict_normal_combine.show_predict_result_in_array(frame_combine,[], 0);
                localStorage.setItem(predict_normal_combine.storage_name.curr_predict_continous + frame_combine.stt, JSON.stringify([]));
                localStorage.setItem(predict_normal_combine.storage_name.curr_index_continous + frame_combine.stt, 0);
                localStorage.setItem(predict_normal_combine.storage_name.curr_3_before_continous + frame_combine.stt, 'predict-f-f-f-t');
                return;
            }
        }
        else if (curr_3_before_continous == 'predict-f-f-f-t') {
            if (arr_du_doan[arr_du_doan.length - 1] == true) {
                var arr_predict_special = [true, false, false, false, false, false, false, false];
                predict_normal_combine.show_predict_result_in_array(frame_combine,arr_predict_special, 1);
                localStorage.setItem(predict_normal_combine.storage_name.curr_predict_continous + frame_combine.stt, JSON.stringify(arr_predict_special));
                localStorage.setItem(predict_normal_combine.storage_name.curr_index_continous + frame_combine.stt, 1);
                localStorage.setItem(predict_normal_combine.storage_name.curr_3_before_continous + frame_combine.stt, 'predict-f-f-f-t-t');
            }
            else {
                var arr_predict_special = [false, false, true, false, true, false, true, false];
                predict_normal_combine.show_predict_result_in_array(frame_combine,arr_predict_special, 1);
                localStorage.setItem(predict_normal_combine.storage_name.curr_predict_continous + frame_combine.stt, JSON.stringify(arr_predict_special));
                localStorage.setItem(predict_normal_combine.storage_name.curr_index_continous + frame_combine.stt, 1);
                localStorage.setItem(predict_normal_combine.storage_name.curr_3_before_continous + frame_combine.stt, 'predict-f-f-f-t-f');
            }
            return;
        }
        else {
            if (obj_before_du_doan != null) {
                arr_before_du_doan = JSON.parse(obj_before_du_doan);
                if (index_before_du_doan < 7 && arr_before_du_doan.length > index_before_du_doan) {
                    if (arr_before_du_doan[index_before_du_doan] != arr_du_doan[arr_du_doan.length - 1]) {
                        is_repeat_du_doan = false;
                    }
                }
            }
        }

        // Lấy ra 3 kết quả gần nhất
        var key = 'predict';

        if (is_repeat_du_doan) {
            key += arr_du_doan[arr_du_doan.length - 3] == true ? '-t' : '-f';
            key += arr_du_doan[arr_du_doan.length - 2] == true ? '-t' : '-f';
            key += arr_du_doan[arr_du_doan.length - 1] == true ? '-t' : '-f';

            var arr_predict = [];
            var html_predict = '';
            var type_money = '';
            if (key == 'predict-t-f-f') {
                arr_predict.push(false);
            }
            else if (key == 'predict-f-f-f') {
                arr_predict.push(false);
            }
            else {
                // Lấy ra kết quả dự đoán
                var obj_predict = localStorage.getItem(key);
                if (obj_predict != null) {
                    arr_predict = JSON.parse(obj_predict);
                }
            }

            predict_normal_combine.show_predict_result_in_array(frame_combine,arr_predict, 0);
            localStorage.setItem(predict_normal_combine.storage_name.curr_predict_continous + frame_combine.stt, JSON.stringify(arr_predict));
            localStorage.setItem(predict_normal_combine.storage_name.curr_index_continous + frame_combine.stt, 0);
            localStorage.setItem(predict_normal_combine.storage_name.curr_3_before_continous + frame_combine.stt, key);

        }
        else {
            // Tăng lên 1 mức đầu tư
            index_before_du_doan = index_before_du_doan + 1;
            predict_normal_combine.show_predict_result_in_array(frame_combine,arr_before_du_doan, index_before_du_doan);
            localStorage.setItem(predict_normal_combine.storage_name.curr_predict_continous + frame_combine.stt, JSON.stringify(arr_before_du_doan));
            localStorage.setItem(predict_normal_combine.storage_name.curr_index_continous + frame_combine.stt, index_before_du_doan);
        }
    },
    show_predict_result_in_array: function (frame_combine,arr_predict, suggest_chose) {
        if (arr_predict.length == 0) {
            //$('label[name=money_predict_continuous_' + frame_combine.stt +']').html('Số tiền : 0');
            $('label[name=money_predict_continuous_' + frame_combine.stt +']').data('typemoney', 'N');
            $('label[name=money_predict_continuous_' + frame_combine.stt +']').data('amountmoney', 0);
            return;
        }

        var type_money = '';
        var html_predict = '';
        for (var index = 0; index < arr_predict.length; index++) {
            if (arr_predict[index]) {
                html_predict += '<div class="predict-choosen">';
                html_predict += '   <div class="arrow-up"></div>';
                if (index == suggest_chose) {
                    type_money = 'T';
                    html_predict += '<label style="border-bottom: 2px solid red;">T' + (index + 1) + '</label>';
                }
                else {
                    html_predict += '   T' + (index + 1);
                }

                html_predict += '</div>';
            }
            else {
                html_predict += '<div class="predict-choosen">';
                html_predict += '   <div class="arrow-down"></div>';
                if (index == suggest_chose) {
                    type_money = 'N';
                    html_predict += '<label style="border-bottom: 2px solid red;">N' + (index + 1) + '</label>';
                }
                else {
                    html_predict += '   N' + (index + 1);
                }

                html_predict += '</div>';
            }
        }
        //$('label[name=money_predict_continuous_' + frame_combine.stt + ']').html('Số tiền : ' + type_money + global_key_combine.money[suggest_chose]);
        $('label[name=money_predict_continuous_' + frame_combine.stt + ']').data('typemoney', type_money);
        $('label[name=money_predict_continuous_' + frame_combine.stt + ']').data('amountmoney', global_key_combine.money[suggest_chose]);
    }
};