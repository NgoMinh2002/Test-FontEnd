<template>
  <div id="editor1"></div>
</template>

<script>
export default {
  // Đặt chiều cao mới ở đây,
  mounted() {
    // Import CKEditor từ tệp đã tải về
    const script = document.createElement("script");
    script.src = "../src/plugins/ckeditor.js"; // Thay đổi đường dẫn đến tệp JavaScript CKEditor
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      // Khởi tạo CKEditor sau khi tệp JavaScript đã tải
      ClassicEditor.create(document.querySelector("#editor1"), {})
        .then((editor1) => {
          console.log("Editor was initialized", editor1);
        })
        .catch((error) => {
          console.error("There was an error initializing the editor", error);
        });
    };
    document.head.appendChild(script);
  },
};
</script>
<style>
</style>