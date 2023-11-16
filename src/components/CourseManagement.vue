<template>
  <v-container>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <v-card-title> Quản lý khóa học</v-card-title>
    <v-sheet elevation="3">
      <v-conatainer class="pa-12">
        <v-data-table
          class="pa-12"
          wrap
          row
          :items-per-page="5"
          :search="search"
          :headers="headers"
          :items="desserts"
          :sort-by="[{ key: 'Studytime', order: 'asc' }]"
        >
          <template v-slot:top>
            <v-toolbar density="compact" color="white">
              <v-spacer></v-spacer>
              <div
                class="d-flex justify-space-between"
                style="width: 500px !important"
              >
                <!--Thanh tìm kiếm -->
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
                          <span>Thông tin khóa học</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-form ref="form" @submit.prevent="onSubmit">
                              <v-row>
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
                                    /></div
                                ></v-col>
                                <v-col cols="12" sm="6">
                                  <div class="">
                                    <span class="font-weight-medium">
                                      <span class="text-red text-font">*</span
                                      >Tên khóa học
                                    </span>
                                  </div>
                                  <v-text-field
                                    :rules="[
                                      (v) => !!v || 'Tên Khóa học bắt buộc',
                                    ]"
                                    required
                                    single-line
                                    :counter="15"
                                    v-model="editedItem.name"
                                    density="compact"
                                    variant="outlined"
                                    type="text"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <div class="">
                                    <span class="font-weight-medium">
                                      <span class="text-red text-font">*</span
                                      >Thời gian học
                                    </span>
                                  </div>

                                  <v-text-field
                                    :rules="[
                                      (v) =>
                                        !!v || 'Bạn phải nhập thời gian học',
                                    ]"
                                    required
                                    single-line
                                    v-model="editedItem.Studytime"
                                    density="compact"
                                    variant="outlined"
                                    type="number"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <div class="">
                                    <span class="font-weight-medium">
                                      <span class="text-red text-font">* </span
                                      >Học phí
                                    </span>
                                  </div>
                                  <v-text-field
                                    :rules="[
                                      (v) => !!v || 'Bạn phải nhập học phí',
                                    ]"
                                    required
                                    single-line
                                    v-model="editedItem.Tuition"
                                    density="compact"
                                    variant="outlined"
                                    type="number"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <div class="">
                                    <span class="font-weight-medium">
                                      <span class="text-red text-font">* </span
                                      >Số lượng môn
                                    </span>
                                  </div>

                                  <v-text-field
                                    :rules="[
                                      (v) =>
                                        !!v || 'Bạn phải nhập số lượng môn',
                                    ]"
                                    required
                                    single-line
                                    density="compact"
                                    v-model="editedItem.Subject"
                                    variant="outlined"
                                    type="number"
                                  ></v-text-field>
                                </v-col>
                                <v-col clos="12" sm="12">
                                  <v-card-title class="text-grey-darken-2"
                                    ><v-icon>mdi-book</v-icon> Nội dung khóa
                                    học</v-card-title
                                  >
                                </v-col>
                                <v-col clos="12" sm="12">
                                  <div>
                                    <v-subtitle class="ml-6 mt-6 my-fonsezi">
                                      Giới thiệu khóa học
                                    </v-subtitle>
                                    <v-card-text>
                                      <ckediorVue></ckediorVue>
                                    </v-card-text>
                                  </div>
                                </v-col>
                                <v-col clos="12" sm="12">
                                  <v-subtitle class="ml-6 mt-6 my-fonsezi">
                                    Nội Dung khóa khọc
                                  </v-subtitle>
                                  <v-card-text>
                                    <ckedior-vue-2></ckedior-vue-2>
                                  </v-card-text>
                                </v-col>
                              </v-row>
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

          <template v-slot:item.actions="{ item }">
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
      </v-conatainer>
    </v-sheet>
  </v-container>
</template>
<script>
import UpdateStudents from "@/views/UpdateStudents.vue";
import ckediorVue from "../views/ckedior.vue";
import ckediorVue2 from "../views/chedior2.vue";
export default {
  components: { ckediorVue, ckediorVue2, UpdateStudents },
  data: () => ({
    defaultImage: "mdi-image-plus-outline",
    hasImage: false,
    search: "",
    items: [
      {
        title: "Home",
        disabled: false,
        to: "/Home",
      },
      {
        title: "Quản lý khóa học",
        disabled: false,
        to: "/coursemanagement",
      },
    ],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: "Tên Khóa học",
        align: "start",
        key: "name",
        sortable: false,
      },
      { title: "Thời gian học", key: "Studytime" },
      { title: "Học Phí", key: "Tuition" },
      { title: "Số Học Viên", key: "students" },
      { title: "Số Lượng môn", key: "Subject" },
      { title: "Loại Khóa học", key: "Course" },
      { title: "Thao Tác", key: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      Studytime: 0,
      Tuition: 0,
      students: 0,
      Subject: 0,
      Course: 0,
    },
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    defaultItem: {
      name: "",
      Studytime: 0,
      Tuition: 0,
      students: 0,
      Subject: 0,
      Course: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Thêm khóa học" : "Cập nhật khóa học";
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
          name: "Frozen Yogurt",
          Studytime: "20/12/2023",
          Tuition: 6.0,
          students: 24,
          Subject: 4.0,
          Course: "Toán cao cấp",
        },
        {
          name: "Ice cream sandwich",
          Studytime: 237,
          Tuition: 9.0,
          students: 37,
          Subject: 4.3,
        },
        {
          name: "Eclair",
          Studytime: "20/11/2023",
          Tuition: 16.0,
          students: 23,
          Subject: 6.0,
        },
        {
          name: "Cupcake",
          Studytime: 305,
          Tuition: 3.7,
          students: 67,
          Subject: 4.3,
        },
        {
          name: "Gingerbread",
          Studytime: 356,
          Tuition: 16.0,
          students: 49,
          Subject: 3.9,
        },
        {
          name: "Jelly bean",
          Studytime: 375,
          Tuition: 0.0,
          students: 94,
          Subject: 0.0,
        },
        {
          name: "Lollipop",
          Studytime: 392,
          Tuition: 0.2,
          students: 98,
          Subject: 0,
        },
        {
          name: "Honeycomb",
          Studytime: 408,
          Tuition: 3.2,
          students: 87,
          Subject: 6.5,
        },
        {
          name: "Donut",
          Studytime: 452,
          Tuition: 25.0,
          students: 51,
          Subject: 4.9,
        },
        {
          name: "KitKat",
          Studytime: 518,
          Tuition: 26.0,
          students: 65,
          Subject: 7,
        },
        {
          name: "KitKat",
          Studytime: 518,
          Tuition: 26.0,
          students: 65,
          Subject: 7,
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