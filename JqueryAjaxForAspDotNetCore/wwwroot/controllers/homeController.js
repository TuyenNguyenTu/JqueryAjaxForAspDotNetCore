/// <reference path="../plugins/jquery.twbspagination.min.js" />

var homeConfig =  {
    pageSize: 5,
    pageIndex:1
}
var homeController = {
    init: function () {
        homeController.loadData();
        homeController.registerEvent();
    },

    loadData: function () {
        $.ajax({
            url: "Home/LoadData",
            type: "GET",
            data: {
                page: homeConfig.pageIndex,
                pageSize: homeController.pageSize
            },
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
                    homeController.paging(response.total, function () {
                        homeController.loadData();
                    });
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
    paging: function (totalRow, callback) {
        var totalPage = Math.ceil(totalRow / homeConfig.pageSize);
        $("#pagination").twbsPagination({
            totalPages: totalPage,
            visiblePages: 5,
            onPageClick: function (event, page) {
                homeConfig.pageIndex = page;
                setTimeout(callback, 200);
            }
        });
    }
}
homeController.init();