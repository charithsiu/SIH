$(function () {
    var $lstDestination = $("#lstDestination");
    var $txtBirthPlanID = $(txtBirthPlanID);

    $(".items").draggable({
        //cancel: "a.ui-icon", // clicking an icon won't initiate dragging
        revert: "invalid", // when not dropped, the item will revert back to its initial position
        containment: "document",
        //helper: "clone",
        cursor: "move"
    });

    $("#lstDestination, #lstDestination .groups").droppable({
        greedy: true,
        accept: ".items",
        hoverClass: "ui-state-active",
        activeClass: "ui-state-highlight",
        drop: function (event, ui) {
            deleteItem(ui.draggable);
        }
    });

    $("#lstDestination").on("click", ".btnRemove", function (e) {
        //alert($(e.target).parent().find(".btnRemove").data("itemid"));
        var $item = $(e.target).parent();
        var $relatedItem = $("#" + $item.find(".btnRemove").data("itemid"));
        $relatedItem.css("left", "0");
        $relatedItem.css("top", "0");
        $relatedItem.fadeIn(function () {
            // Grouped by Category
            //var $parentCategory = $item.parent();

            //// Remove deleted item  
            //$item.remove(); 

            //// Hide Category if no more items
            //var items = $parentCategory.find("li");
            //if (items.length == 0)
            //    $parentCategory.parent().fadeOut();

            //if ($("#lstDestination").find("li").length == 0)
            //    showHideDragDropTip(true);

            // Grouped by Group
            var $parentGroup = $item.parent();

            // Remove deleted item  
            $item.remove(); 

            // Hide Group if no more items
            var items = $parentGroup.find("li");
            if (items.length == 0) {
                $parentGroup.parent().fadeOut(function() {
                    // Hide Category if no more groups are showing
                    var $parentCategory = $parentGroup.closest(".dest-categories");
                    var groups = $parentCategory.find(".groups:visible");
                    if (groups.length == 0)
                        $parentCategory.fadeOut();
                });
            }


            if ($("#lstDestination").find("li").length == 0)
                showHideDragDropTip(true);
        });

        // Remove selected plan/option
        removeOption($relatedItem.data("itemid"));

        // Show parent category and group
        $relatedItem.closest(".categories").show();
        $relatedItem.closest(".groups").show();
        
    });

    function deleteItem($item) {
        $item.fadeOut(function () {
            // Grouped by Category
            //var $targetCategory = $($item.data("categoryid"));
            //$targetCategory.fadeIn(function () {
            //    $targetCategory.find(".category-items").append("<li><span class='btnRemove' data-itemid='" + $item.attr("id") + "'>&nbsp;</span> > " + $item.html() + "</li>");
            //    showHideDragDropTip(false);
            //    autoExpandResultDiv();
            //    autoHideParentGroupAndCategory($item);
            //});

            // Grouped by Group
            var $targetCategory = $($item.data("categoryid"));
            $targetCategory.show(function () {
                var $targetGroup = $($item.data("groupid"));
                $targetGroup.show(function () {
                    $targetGroup.find(".group-items").append("<li><span class='btnRemove' data-itemid='" + $item.attr("id") + "'>&nbsp;</span> &nbsp; " + $item.html() + "</li>");
                    showHideDragDropTip(false);
                    autoExpandResultDiv();
                    autoHideParentGroupAndCategory($item);
                });
            });
            

            // Save selected plan/option
            addOption($item.data("itemid"));
        });
    }

    function addOption(id) {
        // Save the selected plan id
        $txtBirthPlanID.val($txtBirthPlanID.val() + id + ",");
        //alert($txtBirthPlanID.val());
    }

    function removeOption(id) {
        // Save the selected plan id
        $txtBirthPlanID.val($txtBirthPlanID.val().replace("," + id + ",", ","));
        //alert($txtBirthPlanID.val());
    }

    function showHideDragDropTip(show) {
        if (show) {
            $(".bg-tip").fadeIn();
        } else {
            $(".bg-tip").fadeOut();
        }
    }

    function autoHideParentGroupAndCategory($item) {
        var $parentGroup = $item.closest(".groups");
        var $parentCategory = $parentGroup.closest(".categories");

        // Hide parent group if no visible items left
        var items = $parentGroup.find(".items:visible");
        if (items.length == 0)
            $parentGroup.fadeOut(function () {
                // Hide parent category if no visible groups left
                var groups = $parentCategory.find(".groups:visible");
                if (groups.length == 0)
                    $parentCategory.fadeOut();
            });
    }


    function autoExpandResultDiv() {
        var innerHeight = $lstDestination.find(".inner").height();
        var currentHeight = $lstDestination.height();
        var currentSourceHeight = $("#birthPlan").innerHeight();

        var paddingBottom = 25; // As the Print and Email buttons stay across the bottom border
        innerHeight += paddingBottom;

        if (innerHeight > currentHeight || innerHeight < currentSourceHeight) {
            $lstDestination.css("height", Math.max(innerHeight, currentHeight, currentSourceHeight));
        }
    }

    function initCollapseExpand() {
        $("#lstSource .categories .category").click(function () {
            var $this = $(this);
            var selectedCategoryID = "cat-groups-" + $(this).data("categoryid");
            
            // Collapse all other details
            $(".category-details").each(function (index, element) {
                if ($(element).attr("id") != selectedCategoryID)
                    $(element).hide();
            }); 

            // Expand selected details
            var $targetDiv = $("#" + selectedCategoryID);
            if ($targetDiv.is(':visible')) {
                $targetDiv.slideUp(function() {
                    $this.removeClass("active");
                });
            } else {
                $targetDiv.slideDown(function() {
                    autoExpandResultDiv();
                });
            }

            // Set active status
            $("#lstSource .category.active").removeClass("active");
            $(this).addClass("active");
            
        });
    }

    initCollapseExpand();

    // Email Popup
    $('a#btnEmailBirthPlan').click(function () {
        $.fancybox({
            padding: 0,
            href: '/DesktopModules/BirthPlan/Controls/Email.aspx?IDs=' + getSelectedOptionIDs(),
            type: 'iframe',
            width: '1024px'
        });
        return false;
    });

    $('a#btnEmailBirthPlanMobile').click(function () {
        var selectedOptionIDs = collectBirthPlanMobile();
        $.fancybox({
            padding: 0,
            href: '/DesktopModules/BirthPlan/Controls/Email.aspx?IDs=' + selectedOptionIDs,
            type: 'iframe',
            width: '1024px'
        });
        return false;
    });

    function getSelectedOptionIDs() {
        return $txtBirthPlanID.val();
    }

    function collectBirthPlanMobile() {
        $txtBirthPlanID.val('0,');
        $('.select-box:checked').each(function () {
            addOption($(this).closest('li').data('itemid'));
        });
        return $txtBirthPlanID.val();
    }

    $('.btnPrintBirthPlanMobile').click(function () {
        collectBirthPlanMobile();
    });
});

function closeFancyboxPopup()
{
    $.fancybox.close();
}