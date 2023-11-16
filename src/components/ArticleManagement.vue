<template>
  <v-container>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <v-card-title> Quản lý bài viết</v-card-title>
    <v-sheet elevation="3">
      <v-container class="pa-12">
        <v-data-table
          class="pa-6"
          wrap
          row
          :items-per-page="5"
          :search="search"
          :headers="headers"
          :items="desserts"
          :sort-by="[{ key: 'name', order: 'asc' }]"
        >
          <template v-slot:top>
            <v-toolbar density="compact" color="white">
              <v-spacer></v-spacer>
              <div
                class="d-flex justify-space-between"
                style="width: 500px !important"
              >
                <v-text-field
                  class="mr-9"
                  :loading="loading"
                  density="compact"
                  variant="solo"
                  label="Search templates"
                  append-inner-icon="mdi-magnify"
                  single-line
                  v-model="search"
                  hide-details
                ></v-text-field>
                <v-dialog v-model="dialog" persistent width="900px">
                  <template class="" v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      variant="elevated"
                      dark
                      color="green"
                      style="width: 120px !important"
                    >
                      Thêm
                    </v-btn>
                  </template>
                  <v-sheet dense>
                    <v-toolbar elevation="5" small height="200px" color="white">
                      <v-toolbar-title class="text-center font-weight-bold">{{
                        formTitle
                      }}</v-toolbar-title>

                      <v-btn
                        icon="mdi-window-close"
                        @click="dialog = false"
                      ></v-btn>
                    </v-toolbar>
                    <v-container class="pa-8">
                      <v-card elevation="5">
                        <v-card-title class="text-grey-darken-2">
                          <v-icon class="mr-2">mdi-book</v-icon>
                          <span>Hình ảnh bài viêt</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-form ref="form" @submit.prevent="onSubmit"
                              ><v-row>
                                <v-col cols="12" sm="12">
                                  <div>
                                    <v-avatar
                                      rounded="0"
                                      size="120"
                                      class="rounded-lg"
                                    >
                                      <v-img
                                        cover
                                        class="rounded-lg"
                                        v-if="hasImage"
                                        :src="imageUrl"
                                        width="100%"
                                      ></v-img>
                                      <v-icon v-else size="120">{{
                                        defaultImage
                                      }}</v-icon>
                                    </v-avatar>
                                    <v-btn
                                      dark
                                      @click="toggleImage"
                                      class="mt-9 mx-6 rounded-lg text-capitalize"
                                      color="blue"
                                    >
                                      {{
                                        hasImage ? "Thay đổi ảnh" : "Thêm ảnh"
                                      }}
                                    </v-btn>
                                    <input
                                      type="file"
                                      ref="fileInput"
                                      @change="uploadImage"
                                      accept="image/*"
                                      style="display: none"
                                    />
                                  </div>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <span class="font-weight-medium mb-2">
                                    <span class="text-red text-font">* </span>
                                    Tên bài viêt
                                  </span>
                                  <v-text-field
                                    v-model="editedItem.name"
                                    :rules="[
                                      (v) =>
                                        !!v || 'Bạn phải nhập tên bài viết',
                                    ]"
                                    required
                                    single-line
                                    density="compact"
                                    variant="outlined"
                                    type="text"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <span class="font-weight-medium mb-2">
                                    <span class="text-red text-font">* </span>
                                    Tên tác giả
                                  </span>
                                  <v-text-field
                                    v-model="editedItem.author"
                                    :rules="[
                                      (v) => !!v || 'Bạn phải nhập tên tác giả',
                                    ]"
                                    required
                                    single-line
                                    density="compact"
                                    variant="outlined"
                                    type="text"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <span class="font-weight-medium mb-2">
                                    <span class="text-red text-font">* </span>
                                    Chủ đề:
                                  </span>
                                  <v-combobox
                                    :rules="[
                                      (v) =>
                                        !!v || 'Bạn phải chọn chủ đề bài viết',
                                    ]"
                                    v-model="editedItem.topic"
                                    single-line
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                    :items="[
                                      'Thông báo',
                                      'Khóa học',
                                      'Tin tức',
                                      'Giải trí',
                                    ]"
                                  ></v-combobox>
                                </v-col>
                                <v-col clos="12" sm="12">
                                  <v-card-title class="text-grey-darken-2"
                                    ><v-icon>mdi-book</v-icon> Nội dung bài
                                    viêt</v-card-title
                                  >
                                </v-col>
                                <v-col clos="12" sm="12">
                                  <div>
                                    <v-subtitle class="ml-6 mt-6 my-fonsezi">
                                      Nọi dung ngắn
                                    </v-subtitle>
                                    <v-card-text>
                                      <ckediorVue></ckediorVue>
                                    </v-card-text>
                                  </div>
                                </v-col>
                                <v-col clos="12" sm="12">
                                  <v-subtitle class="ml-6 mt-6 my-fonsezi">
                                    Nội Dung bài viết
                                  </v-subtitle>
                                  <v-card-text>
                                    <ckedior-vue-2></ckedior-vue-2>
                                  </v-card-text> </v-col
                              ></v-row>
                              <div class="text-center my-8">
                                <!-- Center-align the button -->
                                <v-btn
                                  type="submit"
                                  @click="serve"
                                  color="primary"
                                  class="mr-5"
                                  >Lưu</v-btn
                                >
                                <v-btn
                                  color="red"
                                  @click="dialog = false"
                                  class="ml-5"
                                  >Hủy</v-btn
                                >
                                <!-- Your button here -->
                              </div>
                            </v-form>
                          </v-container>
                        </v-card-text>
                      </v-card>
                    </v-container>
                  </v-sheet>
                </v-dialog>
              </div>
              <v-dialog v-model="dialogDelete" max-width="400px">
                <v-container>
                  <v-row>
                    <v-sheet class="mx-auto p-4" width="400px">
                      <v-card-title>
                        <v-icon
                          size="28"
                          icon="mdi-alpha-i-circle-outline"
                          color="error"
                        ></v-icon>
                        Bạn có chắc muốn xóa không
                      </v-card-title>

                      <v-subtitle class="ml-12">
                        (Hãy cân nhắc trước khi xóa)
                      </v-subtitle>

                      <v-card-actions class="mt-6">
                        <v-spacer></v-spacer>
                        <v-btn
                          variant="elevated"
                          dark
                          class="mr-4"
                          color="indigo-darken-3"
                          flat
                          @click="deleteItemConfirm"
                          >OK</v-btn
                        >
                        <v-btn
                          dark
                          variant="elevated"
                          color="red"
                          flat
                          @click="closeDelete"
                          >Cancel</v-btn
                        >
                      </v-card-actions>
                    </v-sheet>
                  </v-row>
                </v-container>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.Operation="{ item }">
            <v-icon
              size="x-large"
              class="me-2 text-blue"
              @click="editItem(item.raw)"
            >
              mdi-pencil-outline
            </v-icon>
            <v-icon
              size="x-large"
              class="text-red"
              @click="deleteItem(item.raw)"
            >
              mdi-delete-outline
            </v-icon>
          </template>
        </v-data-table>
      </v-container>
    </v-sheet>
  </v-container>
</template>
<script>
import ckediorVue from "../views/ckedior.vue";
import ckediorVue2 from "../views/chedior2.vue";
export default {
  components: { ckediorVue, ckediorVue2 },
  data: () => ({
    items: [
      {
        title: "Home",
        disabled: false,
        to: "/Home",
      },
      {
        title: "Quản lý bài viết",
        disabled: false,
        to: "/ArticleManagement",
      },
    ],
    search: "",
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    defaultImage: "mdi-image-plus-outline",
    hasImage: false,
    desserts: [],
    headers: [
      {
        title: "Tên bài viết",
        align: "start",
        key: "name",
      },
      { title: "Thời gian tạo", key: "createtime" },
      { title: "Tên tác giả", key: "author" },
      { title: "Chủ để", key: "topic" },
      { title: "Tài khoản đăng", key: "Account" },
      { title: "Thao Tác", key: "Operation", sortable: false },
    ],
    editedItem: {
      name: "",
      createtime: "",
      author: "",
      topic: "",
      Account: "",
    },
    defaultItem: {
      name: "",
      createtime: "",
      author: "",
      topic: "",
      Account: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Thêm bài viết" : "Cập nhật bài viết";
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    toggleImage() {
      this.$refs.fileInput.click();
    },
    uploadImage(evnet) {
      const file = evnet.target.files[0];
      if (file && file.type.startsWith("image/")) {
        // Xử lý hình ảnh tại đây (ví dụ: tải lên máy chủ hoặc xử lý local)
        // Sau khi xử lý xong, cập nhật biến hasImage và imageUrl
        this.hasImage = true;
        this.imageUrl = URL.createObjectURL(file);
      } else {
        // Nếu không có hình ảnh được chọn hoặc tệp không phải là hình ảnh, không thực hiện gì cả
        // Đặt lại biến hasImage và imageUrl
        this.hasImage = false;
        this.imageUrl = null;
      }
    },
    initialize() {
      this.desserts = [
        {
          name: "Bài viết số 1",
          createtime: "22-9-2023",
          author: "Tác giả 3",
          topic: "Thông báo",
          Account: "Admin",
        },
        {
          name: "Bài viết số 3",
          createtime: "22-9-2023",
          author: "Tác giả 3",
          topic: "Thông báo",
          Account: "Admin",
        },
        {
          name: "Bài viết số 4",
          createtime: "22-9-2023",
          author: "Tác giả 4",
          topic: "Thông báo",
          Account: "Admin",
        },
        {
          name: "Bài viết số 5",
          createtime: "22-9-2023",
          author: "Tác giả 5",
          topic: "Thông báo",
          Account: "use 1",
        },
      ];
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async onSubmit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        if (this.editedIndex > -1) {
          // Editing an existing item
          this.desserts[this.editedIndex] = { ...this.editedItem };
        } else {
          // Adding a new item
          this.desserts.push({ ...this.editedItem });
        }
        this.dialog = false; // Close the dialog
        this.editedItem = {};
      }

      // Clear the form
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = { ...item };
      this.formTitle = "Cập nhật khóa học"; // Change form title when editing
      this.dialog = true; // Open the dialog
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
};
</script>
<style scoped>
.my-fonsezi {
  font-size: 16px !important;
}
.no-border-textarea {
  border: none !important;
}
</style>