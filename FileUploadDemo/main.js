window.onload = function () {
  getData();
};

async function uploadFile($event) {
  let allowedFileType = "jpg,jpeg,png,gif".split(",");
  let file = $event?.target?.files[0];
  if (file) {
    let fileType = file.type.split("/")[1];
    if (allowedFileType.indexOf(fileType) !== -1) {
      let size = file.size / 1024 / 1024;
      if (size < 2) {
        let formData = new FormData();
        let newName = "file_" + Date.now() + "." + fileType;
        formData.append("file", file, newName);
        await uploadImage("upload.php", { method: "POST", body: formData });
      } else {
        alert("please select file under 2MB");
      }
    } else {
      alert(
        "please select valid file format from this list : jpg, jpeg, png or gif"
      );
    }
  }
}

function uploadImage(url, data) {
  fetch(url, data)
    .then(
      async (response) => {
        await getData();
      },
      (error) => {
        return error;
      }
    )
    .catch((err) => {
      return error;
    });
}

function getData() {
  fetch("getList.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then(async (result) => {
      //console.log("result", result);
      if (result && result != "[]") {
        var list = JSON.parse(result).data;
        var container = document.getElementById("container");
        container.innerHTML = "";
          // let div1 = document.createElement("div");
          // div1.classList.add("row");
          // div1.innerHTML="";
        await list.forEach((item) => {
          let div = document.createElement("div");
          div.classList.add("col-lg-4");
          let div1 = document.createElement("div");
          div1.classList.add("img-con");
          let div2 = document.createElement("div");
          div2.classList.add("data");
          

          var img = new Image();
          img.src = "Images/" + item;
          img.classList.add("preview-image");
          img.setAttribute("id", item);
          let p = document.createElement("p");
          p.classList.add("image-title");
          p.innerText = item.split(".")[0];
          div2.append(img);
          div1.append(div2);
          div1.append(p);
          div.append(div1);
          container.append(div);
          //div1.append(div);
        });
      } else {
        //var container = document.getElementById("container");
        // container.append("No Data Found");
      }
    });
}

