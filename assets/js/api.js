var script_url = "https://script.google.com/macros/s/AKfycbxeL3DrnALkEbmGxlCT4iGKjUBl2dVbqbxsq-wYOOJKQQuFaLLkF5Yg00Y5j5jr9gQ/exec";
var admin_data = ""; 
function getData(url){
    data_url = script_url + url;
    $.getJSON(data_url, function (json) {
        json.records = json.records.filter((item)=>item.IsDeleted == 0);
        setBookingDataUI(json);
    });
}
function getData_gridDesign(url){
    data_url = script_url + url;
    $.getJSON(data_url, function (json) {
        json.records = json.records.filter((item)=>item.IsDeleted == 0);
        setBookingDataUI_GridDesign(json);
    });
}
function getDataAdmin(url){
    data_url = script_url + url;
    $.getJSON(data_url, function (json) {
        json.records = json.records.filter((item)=>item.IsDeleted == 0);
        admin_data = json.records;
        setTableAdminUI(json);
    });
}
function deleteRecordApi(url){ 
    data_url = script_url + url;
    $.getJSON(data_url, function (json) { 
        if(json.result == "value deleted successfully"){ 
            bootbox.alert("Record is deleted successfully", function(){
                var read_url="?action=read&table=tbl_BookingDetails"; 
                getDataAdmin(read_url);
            });
        }
    }); 
}
function insertRecord(url){ 
    data_url = script_url + url;
    $.getJSON(data_url, function (json) { 
        $("#exampleModal").modal("hide");
        if(json.result == true){
            bootbox.alert("Record is inserted successfully", function(){
                var read_url="?action=read&table=tbl_BookingDetails"; 
                getDataAdmin(read_url);
            });
        }
    }); 
}
function updateRecord(url){ 
    data_url = script_url + url;
    $.getJSON(data_url, function (json) { 
        $("#exampleModal").modal("hide");
        if(json.result == "value updated successfully"){
            bootbox.alert("Record is updated successfully", function(){
                var read_url="?action=read&table=tbl_BookingDetails"; 
                getDataAdmin(read_url);
            });
        }
    }); 
}
function setTableAdminUI(json)
{ 
    var tr_element = "";
    if(json != null && json.records.length > 0){ 
        $.each(json.records, function(i,v){ 
            var identifier = v.id;
            var customer_name = v.CustomerName;
            var date = v.Date;
            var CostumeType = v.CostumeType;
            var quantity = v.Quantity;
            tr_element = tr_element + "<div class='col-12 dynamicUI'><div class='col-12 uniqueAccess displayflex' id='"+identifier+"' class='col-12 displayflex'> <div class='col-4'> <span class='span_label'>Date</span> </div> <div class='col-8'> <span><b>"+convertDate(date)+"</b></span> </div> </div> <div class='col-12 displayflex'> <div class='col-4'> <span class='span_label'>Name</span> </div> <div class='col-8'> <span><b>"+customer_name+"</b></span> </div> </div> <div class='col-12 displayflex'> <div class='col-4'> <span class='span_label'>Type</span> </div> <div class='col-8'> <span><b>"+CostumeType+"</b></span> </div> </div><div class='col-12 displayflex'> <div class='col-4'> <span class='span_label'>Quantity</span> </div> <div class='col-8'> <span><b>"+quantity+"</b></span> </div> </div> <div class='col-12 mtop20 displayflex'> <div class='col-6'> <button  onClick='fnEdit(this)' class='w100 btn btn-primary' id='"+identifier+"'>Edit</button> </div> <div class='col-6'> <button onClick='fndelete(this)' id='"+identifier+"' class='w100 btn btn-danger'>Delete</button> </div> </div></div>";
        }); 
    }
    else{
        var message = "Sorry, No Records Found !!";
        tr_element = tr_element + "<div class='empty'>" +message+"</div>";
    }
    $("#tbl_bodyItems").html(tr_element);
}
function fndelete(id){
    if(id != null && id != ""){
        var identifier = $(id).attr("id");   
        bootbox.confirm("Do you want to delete this record?", function(result){ 
            if(result == true){
                fnconfirmdelete(identifier);
            }
        }); 
    }
}   
function fnconfirmdelete(identifier){
    if(identifier != '0' && identifier != '' && identifier != null){
    var url = "?id=" + identifier + "&action=delete&table=tbl_BookingDetails";
    deleteRecordApi(url);
    }
}
function setBookingDataUI(json)
{ 
    var div_UI = "";
    var temp_data = [];
    if(json != null && json.records.length > 0){ 
        $.each(json.records, function(i,k){
            var customer_name = k.CustomerName;
            var date = k.Date;
            var CostumeType = k.CostumeType;
            var quantity = k.Quantity;
            div_UI = div_UI + "<div class='dynamicUI'><div class='row'><div class='date'><span>"+convertDate(date)+"</span></div></div><div class='row'><div class='col-12'><div class='displayflex'><div class='col-10 bookData'><div class='col-12 displayflex'><div class='col-6'><span class='span_label'>Customer Name</span><div>"+customer_name+"</div></div><div class='col-6'><span class='span_label'>Costume Type</span><div>"+CostumeType+"</div></div></div></div><div class='col-2 bookquantity'><span class='span_label_quanity'>Quantity (No.s)</span><div style='text-align: center;' class='quantity-span'>"+quantity+"</div></div></div></div></div></div>"
        }); 
    }
    else{
        var message = "Sorry, No Records Found !!";
        div_UI = div_UI + "<div class='empty'>" +message+"</div>";
    }
    $(".dynamicBind").html(div_UI);
}
function setBookingDataUI_GridDesign(json)
{ 
    var div_UI_col6 = "";
    var div_UI_col6_2="";
    var temp_data = [];
    if(json != null && json.records.length > 0){ 
        $.each(json.records, function(i,k){
            var customer_name = k.CustomerName;
            var date = k.Date;
            var CostumeType = k.CostumeType;
            var quantity = k.Quantity;
            console.log(i%2);
            if(i%2 == 0){
                div_UI_col6 = div_UI_col6 + "<div class='dynamicUI'><div class='row'><div class='col-12'><div class='displayflex'><div class='col-10 bookData'><div class='col-12 displayflex'><div class='col-4'><span class='span_label'>Date</span><div>"+convertDate(date)+"</div></div><div class='col-4'><span class='span_label'>Customer Name</span><div>"+customer_name+"</div></div><div class='col-4'><span class='span_label'>Costume Type</span><div>"+CostumeType+"</div></div></div></div><div class='col-2 bookquantity'><span class='span_label_quanity'>Quantity</span><div style='text-align: center;' class='quantity-span'>"+quantity+"</div></div></div></div></div></div>";
            }
            else{
                div_UI_col6_2 = div_UI_col6_2 + "<div class='dynamicUI'><div class='row'><div class='col-12'><div class='displayflex'><div class='col-10 bookData'><div class='col-12 displayflex'><div class='col-4'><span class='span_label'>Date</span><div>"+convertDate(date)+"</div></div><div class='col-4'><span class='span_label'>Customer Name</span><div>"+customer_name+"</div></div><div class='col-4'><span class='span_label'>Costume Type</span><div>"+CostumeType+"</div></div></div></div><div class='col-2 bookquantity'><span class='span_label_quanity'>Quantity</span><div style='text-align: center;' class='quantity-span'>"+quantity+"</div></div></div></div></div></div>";
            }
        }); 
    }
    else{
        var message = "Sorry, No Records Found !!";
        div_UI = div_UI + "<div class='empty'>" +message+"</div>";
    }
    $(".dynamicBind").html(div_UI_col6);
    $(".dynamicBind_Second").html(div_UI_col6_2);
}
function fnEdit(id){
    var identifier =  $(id).attr("id");
    if(identifier.length > 0){ 
        var data = admin_data.filter(s=>s.id == identifier);
        $("#bookDetails").find("#customer_name").val(data[0].CustomerName);
        $("#bookDetails").find("#hdnID").val(data[0].id);
        $("#bookDetails").find("#costume_type").val(data[0].CostumeType);
        $("#bookDetails").find("#quantity").val(data[0].Quantity);
        $("#bookDetails").find("#date").val(convertDateYYYMMDD(data[0].Date));
        $("#exampleModal").modal("show");
    }
}
function convertDate(datevalue)
{
    const date = new Date(datevalue);
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
function convertDateYYYMMDD(datevalue)
{
    const date = new Date(datevalue);
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}