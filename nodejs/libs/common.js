const crypto = require("crypto");

module.exports = {
    md5:function(str){
        var obj = crypto.createHash("md5");
        obj.update(str);
        return obj.digest("hex");
    }
}