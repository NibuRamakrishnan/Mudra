$(function(){
$("#addnewrow").on("click", function(){
var empty_row = "<tr id='0'><td><input type='date' class='form-control' value=''></input></td><td><input type='text' class='form-control' value=''></input></td><td><input type='text' class='form-control' value=''></input></td><td><input type='text' class='form-control' value=''></input></td><td><button onClick='fnsave(this)' class='btn btn-primary'>Save</button><button onClick='fndelete(this)' class='btn btn-danger ml10'>Delete</button></td></tr>"
$("#tbl_book tbody").append(empty_row);
});
$("#bookDetails").submit(function(event){
event.preventDefault()
if($("#bookDetails").find("#hdnID").val() != '0' && $("#bookDetails").find("#hdnID").val() != '' && $("#bookDetails").find("#hdnID").val() != null)
{
    var input_data = $("#bookDetails").serialize();
    var insert_url = "?id="+$("#bookDetails").find("#hdnID").val()+"&&"+input_data+"&action=update&table=tbl_BookingDetails";
    updateRecord(insert_url);
}
else{
    var input_data = $("#bookDetails").serialize();
    var insert_url = "?"+input_data+"&action=insert&table=tbl_BookingDetails";
    insertRecord(insert_url);
}
});
$("#addnewrow").on("click", function(){
    $("#bookDetails").find("#hdnID").val('0');
    $("#bookDetails").find("#customer_name").val(''); 
        $("#bookDetails").find("#costume_type").val('');
        $("#bookDetails").find("#quantity").val(0);
        $("#bookDetails").find("#date").val('');
    $("#exampleModal").modal("show"); 
});
});