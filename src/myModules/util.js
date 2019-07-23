const util = {
    random (len,radix) {
        len = len || 8;
        radix = radix || 16;
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    
    },
    myAjax (options) {
		var success = $.Callbacks();
		var beforeSend = $.Callbacks();
		var error = $.Callbacks();
		var complete = $.Callbacks();
		var defaultSuccess = function(){
		};
		var defaultBeforeSend = function(){
		};
		var defaultError = function(xhr,status,err){
		};
		var defaultComplete = function(xhr,status){
		};
		success.add(defaultSuccess);
		beforeSend.add(defaultBeforeSend);
		error.add(defaultError);
		complete.add(defaultComplete);
		if(typeof options.success == 'function')
			success.add(options.success);
		if(typeof options.beforeSend == 'function')
			beforeSend.add(options.beforeSend);
		if(typeof options.error == 'function')
			error.add(options.error);
		if(typeof options.complete == 'function')
			complete.add(options.complete);
		var defaultOpt = {
			'beforeSend': beforeSend.fire,
			'success': success.fire,
			'type': 'post',
			'dataType': 'json',
			'timeout': 60000,
			'error': error.fire,
			'complete': complete.fire
		}
		$.extend(options,defaultOpt);
		$.ajax(options);
	}
}
module.exports = util;