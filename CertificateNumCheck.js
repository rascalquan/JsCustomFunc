//檢核身份證號居留證號
function checkCertificateNum(value) {
    var type;
    var reg = RegExp(/^[A-Z][A-D]\d{0,}$/);
    if(value.match(reg)){
        type="0_3";
        //.log("證件號：["+value+"]以兩位字母開頭，按居留證邏輯檢核");
    }else{
        type="0_0";
        //console.log("證件號：["+value+"]按身份證邏輯檢核");
    }
    if (type === "0_0") {
        if (value === "") {
            return true;
        }

        if (value.length != 10 && value.length != 15 && value.length != 18) {
            //BenQGuru.eHR.MessageHandler.alert((BenQGuru.eHR.GlobalResource.get("CertificateError") || "身份证号码有错误！"));
            alert("身份證號有錯誤！");
            return false;
        }
        var reg;
        if (value.length == 18) {
            reg = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3}[xX\d])$/);
        }
        else if (value.length == 10) {
            reg = RegExp(/^[A-Z][1-2]\d{8}$/);
        }
        else if (value.length == 15) {
            reg = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
        }
        else {
            //BenQGuru.eHR.MessageHandler.alert((BenQGuru.eHR.GlobalResource.get("CertificateLengthError") || "输入的数字位数不对！"));
            //console.log("輸入的數字位數不對！");
            alert("證件號碼錯誤！");
            return false;
        }

        var match = value.match(reg);
        if (match != null) {
            if (value.length == 15 || value.length == 18) {
                var d, b;
                if (value.length == 15) {
                    d = new Date("19" + match[3] + "/" + match[4] + "/" + match[5]);
                    b = d.getYear() == match[3] && (d.getMonth() + 1) == match[4] && d.getDate() == match[5];
                }
                else if (value.length == 18) {
                    d = new Date(match[3] + "/" + match[4] + "/" + match[5]);
                    b = d.getFullYear() == match[3] && (d.getMonth() + 1) == match[4] && d.getDate() == match[5];
                }

                if (!b) {
                    //BenQGuru.eHR.MessageHandler.alert((BenQGuru.eHR.GlobalResource.get("CertificateDateError_1") || "输入的身份证号")
                    //    + match[0]
                    //    + (BenQGuru.eHR.GlobalResource.get("CertificateDateError_2") || " 的出生日期不对！"));
                    //console.log("輸入的身份證號" + match[0] + " 出生日期不對！");
                    alert("證件號碼錯誤！");
                    return false;
                }
            }
            else {
                try {
                    var region = getRegion(value.substr(0, 1));
                    var validValue = region + value.substr(1, value.length - 1);
                    
                    var sum = 0, digital, times;
                    for (var i = 0; i < validValue.length - 1; i++) {
                        digital = parseInt(validValue.substr(i, 1));
                        if (digital == NaN) {
                            throw "Invalid certificate character";
                        }
                        if (i === 0) {
                            times = 1;
                        }
                        else {
                            times = 10 - i;
                        }

                        sum += digital * times;
                    }

                    var validDigital = parseInt(value.substr(9, 1));
                    var result = sum % 10;
                    if (result !== 0) {
                        result = 10 - result;
                    }

                    var validation = result === validDigital;
                    if (!validation) {
                        //BenQGuru.eHR.MessageHandler.alert((BenQGuru.eHR.GlobalResource.get("CertificateError") || "身份证号码有错误！"));
                        alert("證件號碼錯誤！");
                    }
                    return validation;
                }
                catch (e) {
                    //BenQGuru.eHR.MessageHandler.alert((BenQGuru.eHR.GlobalResource.get("CertificateError") || "身份证号码有错误！"));
                    alert("證件號碼錯誤！");
                    return false;
                }
            }
        }

        else {
            //BenQGuru.eHR.MessageHandler.alert((BenQGuru.eHR.GlobalResource.get("CertificateError") || "身份证号码有错误！"));
            alert("證件號碼錯誤！");
            return false;
        }
    }

    if (type === "0_3") {
        if (value === "") {
            return true;
        }

        if (value.length != 10) {
            //BenQGuru.eHR.MessageHandler.alert((BenQGuru.eHR.GlobalResource.get("CertificateError") || "身份证号码有错误！"));
            alert("證件號碼錯誤！");
            return false;
        }
        var reg;
        if (value.length == 10) {
            reg = RegExp(/^[A-Z][A-D]\d{8}$/);
        }
        else {
            //BenQGuru.eHR.MessageHandler.alert((BenQGuru.eHR.GlobalResource.get("CertificateLengthError") || "输入的数字位数不对！"));
            //console.log("輸入的數字位數不對！");
            alert("證件號碼錯誤！");
            return false;
        }

        var match = value.match(reg);
        if (match != null) {
            try {
                var region = getRegion(value.substr(0, 1));
                var region2 = getRegion(value.substr(1, 1));
                var validValue =region+ region2 + value.substr(2, value.length - 1);
                var val1=0;
                var val2=0;
                var sum = 0, digital, times;
                for (var i = 0; i < validValue.length-1; i++) {
                    digital = parseInt(validValue.substr(i, 1));
                    if (digital == NaN) {
                        throw "Invalid certificate character";
                    }
                    if (i === 0) {
                        times = 1;
                    }
                    else if (i === 1) {
                        times = 9;
                    }
                    else if (i === 2) {
                        times = 0;
                    }
                    else {
                        times = 11 - i;
                    }

                    sum += digital * times;
                }

                var validDigital = parseInt(value.substr(9, 1));
                var result = sum % 10;
                if (result !== 0) {
                    result = 10 - result;
                }

                var validation = result === validDigital;
                if (!validation) {
                    //BenQGuru.eHR.MessageHandler.alert((BenQGuru.eHR.GlobalResource.get("CertificateError") || "身份证号码有错误！"));
                    alert("證件號碼錯誤！");
                }
                return validation;
            }
            catch (e) {
                //BenQGuru.eHR.MessageHandler.alert((BenQGuru.eHR.GlobalResource.get("CertificateError") || "身份证号码有错误！"));
                alert("證件號碼錯誤！");
                return false;
            }

        }

        else {
            //BenQGuru.eHR.MessageHandler.alert((BenQGuru.eHR.GlobalResource.get("CertificateError") || "身份证号码有错误！"));
            alert("證件號碼錯誤！");
            return false;
        }
    }

    function getRegion(prefix) {
        var regionDigital;
        switch (prefix) {
            case "A":
                regionDigital = "10";
                break;
            case "B":
                regionDigital = "11";
                break;
            case "C":
                regionDigital = "12";
                break;
            case "D":
                regionDigital = "13";
                break;
            case "E":
                regionDigital = "14";
                break;
            case "F":
                regionDigital = "15";
                break;
            case "G":
                regionDigital = "16";
                break;
            case "H":
                regionDigital = "17";
                break;
            case "I":
                regionDigital = "34";
                break;
            case "J":
                regionDigital = "18";
                break;
            case "K":
                regionDigital = "19";
                break;
            case "L":
                regionDigital = "20";
                break;
            case "M":
                regionDigital = "21";
                break;
            case "N":
                regionDigital = "22";
                break;
            case "O":
                regionDigital = "35";
                break;
            case "P":
                regionDigital = "23";
                break;
            case "Q":
                regionDigital = "24";
                break;
            case "R":
                regionDigital = "25";
                break;
            case "S":
                regionDigital = "26";
                break;
            case "T":
                regionDigital = "27";
                break;
            case "U":
                regionDigital = "28";
                break;
            case "V":
                regionDigital = "29";
                break;
            case "W":
                regionDigital = "32";
                break;
            case "X":
                regionDigital = "30";
                break;
            case "Y":
                regionDigital = "31";
                break;
            case "Z":
                regionDigital = "33";
                break;
            default:
                throw "Invalid region character";
        }

        return regionDigital;
    }

    return true;
}
