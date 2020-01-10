var homeController = {
    init: function () {
        homeController.loadData();
        homeController.registerEvent();
    },

    loadData: function () {
        $.ajax({
            type: "GET",
            url: "Home/LoadData",
            dataType: "JSON",
            success: function (response) {
                if (response.status) {
                    var data = response.data;
                    var template = $("#data-template").html();
                    var htmldata = "";
                    $.each(data, function (indexInArray, valueOfElement) {
                        htmldata += Mustache.render(template, {
                            ID: valueOfElement.id,
                            Name: valueOfElement.name,
                            Age: valueOfElement.age,
                            Status: valueOfElement.status == false ? '<button type="button" class="btn btn-danger">Block</button>' : '<button type="button" class="btn btn-success">Active</button>'
                        });
                    });
                    $("#tblData").html(htmldata);

                }
            }
        });
    },
    registerEvent: function () {
        $(document).ready(function () {
            $('.txtAge').off('keypress').on('keypress', function (e) {
                if (e.which == 13) {
                    var id = $(this).data('id');
                    var value = $(this).val();
                    homeController.updateData(id, value);
                }
            });
        });
      
    },
    updateData: function (id, value) {
        var data = {
            ID: id,
            Age: value
        }
        $.ajax({
            url: 'Home/Update',
            type: 'POST',
            dataType: 'JSON',
            data: { strEmployee: JSON.stringify(data) },
            success: function (response) {
                if (response.status == true) {
                    alert('Update thanh cong');
                } else {
                    alert("Update Failed");
                }
            }
        });
    },
}
homeController.init();