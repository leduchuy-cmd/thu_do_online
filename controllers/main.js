$(document).ready(function () {
  var callData = new CallData();
  var listChosen = new ListChosen();

  renderHTML();

  function renderHTML() {
    callData
      .getListData()
      .done(function (result) {
        var contentNavPill = "";
        var contentTabPane = "";

        result.navPills.forEach(function (item, index) {
          var activeClass = item.tabName === "tabTopClothes" ? "active" : "";

          var fadeClass = item.tabName !== "tabTopClothes" ? "fade" : "";

          contentNavPill += getElmTabPills(item, activeClass);

          contentTabPane += `<div class = 'tab-pane container ${fadeClass} ${activeClass}' id="${
            item.tabName
          }">
          <div class = 'row'>
            ${renderTabPane(item.tabName, result.tabPanes)}
          </div>
          </div>`;
        });
        $(".nav-pills").html(contentNavPill);
        $(".tab-content").html(contentTabPane);
      })
      .fail(function (err) {
        console.log(err);
      });
  }

  // Ham tra ve the li
  function getElmTabPills(nav, activeClass) {
    return `<li class="nav-item">
          <a
            class="nav-link btn-default ${activeClass}"
            data-toggle="pill"
            href="#${nav.tabName}"
          >
            ${nav.showName}
          </a>
        </li>`;
  }

  function getTypeArray(tabType, data) {
    var temArr = [];
    data.forEach(function (item) {
      if (item.type === tabType) {
        temArr.push(item);
      }
    });
    return temArr;
  }

  function getEleItem(temArr) {
    var elementItem = "";
    temArr.forEach(function (item) {
      elementItem += `<div class="col-md-3">
      <div class="card text-center">
        <img src="${item.imgSrc_jpg}" />
        <h4>
          <b>${item.name}</b>
        </h4>
        <button data-id="${item.id}" data-type="${item.type}" data-name="${item.name}" data-desc="${item.desc}" data-imgsrcjpg="${item.imgSrc_jpg}"  data-imgsrcpng="${item.imgSrc_png}" class="changStyle">Thử đồ</button>
      </div>
    </div>`;
    });
    return elementItem;
  }

  function findIndex(type) {
    var index = -1;
    if (listChosen.arr && listChosen.length > 0) {
      listChosen.arr.forEach(function (item, i) {
        if (item.type === type) {
          index = i;
        }
      });
    }
    return index;
  }

  $("body").delegate(".changStyle", "click", function () {
    var id = $(this).data("id");
    var type = $(this).data("type");
    var name = $(this).data("name");
    var desc = $(this).data("desc");
    var imgsrc_jpg = $(this).data("imgsrcjpg");
    var imgsrc_png = $(this).data("imgsrcpng");

    var choseItem = new ChoseItem(id, type, name, desc, imgsrc_jpg, imgsrc_png);

    var index = findIndex(choseItem.type);
    if (index !== -1) {
      listChosen.arr[index] = choseItem;
    } else {
      listChosen.addItem(choseItem);
    }

    renderContain(listChosen.arr);
  });

  function renderContain(choseItem) {
    if (choseItem && choseItem.length > 0) {
      choseItem.forEach(function (item) {
        switch (item.type) {
          case "topclothes":
            renderBikiniTop(item.imgsrc_png);
            break;
          case "botclothes":
            renderBikiniBottom(item.imgsrc_png);
            break;
          case "shoes":
            renderFeet(item.imgsrc_png);
            break;
          case "handbags":
            renderHandbags(item.imgsrc_png);
            break;
          case "necklaces":
            renderNecklace(item.imgsrc_png);
            break;
          case "hairstyle":
            renderHairstyle(item.imgsrc_png);
            break;
          case "background":
            renderBackground(item.imgsrc_png);
            break;

          default:
            break;
        }
      });
    }
  }

  function renderBikiniTop(img) {
    $(".bikinitop").css({
      width: "500px",
      height: "500px",
      background: `url(${img})`,
      position: "absolute",
      top: "-9%",
      left: "-5%",
      zIndex: "3",
      transform: "scale(0.5)",
    });
  }

  function renderBikiniBottom(img) {
    $(".bikinibottom").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      top: "-30%",
      left: "-5%",
      zIndex: "2",
      transform: "scale(0.5)",
    });
  }

  function renderFeet(img) {
    $(".feet").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      bottom: "-37%",
      right: "-3.5%",
      transform: "scale(0.5)",
      zIndex: "1",
    });
  }

  function renderHandbags(img) {
    $(".handbag").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      bottom: "-40%",
      right: "-3.5%",
      transform: "scale(0.5)",
      zIndex: "4",
    });
  }

  function renderNecklace(img) {
    $(".necklace").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      bottom: "-40%",
      right: "-3.5%",
      transform: "scale(0.5)",
      zIndex: "4",
    });
  }

  function renderHairstyle(img) {
    $(".hairstyle").css({
      width: "1000px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      top: "-75%",
      right: "-57%",
      transform: "scale(0.15)",
      zIndex: "4",
    });
  }

  function renderBackground(img) {
    $(".background").css({
      backgroundImage: `url(${img})`,
    });
  }

  function renderTabPane(tabName, arrTabPanes) {
    var temArr = null;
    var ilementItem = null;

    switch (tabName) {
      case "tabTopClothes":
        temArr = getTypeArray("topclothes", arrTabPanes);
        ilementItem = getEleItem(temArr);
        break;

      case "tabBotClothes":
        temArr = getTypeArray("botclothes", arrTabPanes);
        ilementItem = getEleItem(temArr);
        break;

      case "tabShoes":
        temArr = getTypeArray("shoes", arrTabPanes);
        ilementItem = getEleItem(temArr);
        break;

      case "tabHandBags":
        temArr = getTypeArray("handbags", arrTabPanes);
        ilementItem = getEleItem(temArr);
        break;

      case "tabNecklaces":
        temArr = getTypeArray("necklaces", arrTabPanes);
        ilementItem = getEleItem(temArr);
        break;

      case "tabHairStyle":
        temArr = getTypeArray("hairstyle", arrTabPanes);
        ilementItem = getEleItem(temArr);
        break;

      case "tabBackground":
        temArr = getTypeArray("background", arrTabPanes);
        ilementItem = getEleItem(temArr);
        break;

      default:
        break;
    }
    return ilementItem;
  }
});

////////////////
