<template>
  <v-container>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <v-card-title>Quản lý tài khoản</v-card-title>
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
                    <v-btn v-bind="props" variant="elevated" dark color="green">
                      Thêm tài khoản
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
                          <v-icon class="mr-2">mdi-account</v-icon>
                          <span>Thông tin tài khoản</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-form ref="form" @submit.prevent="onSubmit"
                              ><v-row class="mt-4">
                                <v-col cols="12" sm="6" md="6">
                                  <span class="font-weight-medium mb-2">
                                    <span class="text-red text-font">* </span>
                                    Tên người dùng
                                  </span>
                                  <v-text-field
                                    v-model="editedItem.name"
                                    :rules="[
                                      (v) =>
                                        !!v || 'Bạn phải nhập tên người dùng',
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
                                    Tài khoản
                                  </span>
                                  <v-text-field
                                    v-model="editedItem.account"
                                    :rules="[
                                      (v) =>
                                        !!v || 'Bạn phải nhập tên tài khoản',
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
                                    Mật khẩu
                                  </span>
                                  <v-text-field
                                    required
                                    :rules="[
                                      requiredRule,
                                      minRule(8),
                                      complexRule,
                                    ]"
                                    single-line
                                    v-model="password"
                                    density="compact"
                                    variant="outlined"
                                    @input="checkPasswordsMatch"
                                    :append-inner-icon="
                                      visible ? 'mdi-eye' : 'mdi-eye-off'
                                    "
                                    :type="visible ? 'text' : 'password'"
                                    @click:append-inner="visible = !visible"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <span class="font-weight-medium mb-2">
                                    <span class="text-red text-font">* </span>
                                    Mật khẩu xác nhận lại mât khẩu
                                  </span>
                                  <v-text-field
                                    required
                                    :rules="[
                                      requiredRule,
                                      confirmPasswordRule(password),
                                    ]"
                                    single-line
                                    density="compact"
                                    variant="outlined"
                                    v-model="confirmPassword"
                                    :append-inner-icon="
                                      visible2 ? 'mdi-eye' : 'mdi-eye-off'
                                    "
                                    :type="visible2 ? 'text' : 'password'"
                                    @click:append-inner="visible2 = !visible2"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <span class="font-weight-medium mb-2">
                                    <span class="text-red text-font">* </span>
                                    Quyền hạn:
                                  </span>
                                  <v-combobox
                                    v-model="editedItem.permission"
                                    single-line
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                    :items="[
                                      'Andim',
                                      'Cộng tác viên',
                                      'Quản lý học viên',
                                    ]"
                                  ></v-combobox>
                                </v-col>
                              </v-row>
                              <div class="text-center my-8">
                                <!-- Center-align the button -->
                                <v-btn
                                  style="width: 100px !important"
                                  type="submit"
                                  @click="serve"
                                  color="primary"
                                  class="mr-5"
                                  >Lưu</v-btn
                                >
                                <v-btn
                                  style="width: 100px !important"
                                  color="red"
                                  @click="dialog = false"
                                  class="ml-5"
                                  >Hủy</v-btn
                                >
                                <!-- Your button here -->
                              </div></v-form
                            >
                          </v-container>
                        </v-card-text>
                      </v-card>
                    </v-container>
                  </v-sheet>
                </v-dialog>
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
              </div>
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
export default {
  data: () => ({
    visible: false,
    visible2: false,
    items: [
      {
        title: "Home",
        disabled: false,
        to: "/Home",
      },
      {
        title: "Quản lý bài viết",
        disabled: false,
        to: "/AccountManagement",
      },
    ],
    dialog: false,
    editedIndex: -1,
    search: "",
    dialogDelete: false,
    desserts: [],
    headers: [
      {
        title: "Tên người dùng",
        align: "start",
        key: "name",
      },
      { title: "Tài khoản", key: "account" },
      { title: "Quyền hạn", key: "permission" },
      { title: "Thao Tác", key: "Operation", sortable: false },
    ],
    editedItem: { name: "", account: "", permission: "" },
    defaultItem: { name: "", account: "", permission: "" },
    password: "",
    confirmPassword: "",
    requiredRule: (value) => !!value || "Bạn phải nhập mật khẩu.",
    minRule: (minLength) => (v) =>
      (v && v.length >= minLength) ||
      `Mật khẩu phải có ít nhất ${minLength} ký tự.`,
    complexRule: (v) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        v
      ) ||
      "Mật khẩu phải chứa ít nhất một ký tự in hoa, một ký tự in thường, một ký tự đặc biệt và một số.",
    confirmPasswordRule: (passwordValue) => (confirmValue) =>
      confirmValue === passwordValue ||
      "Xác nhận mật khẩu không khớp với mật khẩu.",
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Đăng ký tài khoản"
        : "Cập nhật bài viết";
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.desserts = [
        {
          name: "Nguyễn Văn A",
          account: "admin",
          permission: "Admin",
        },
        {
          name: "Nguyễn Văn B",
          account: "Admin 2",
          permission: "Admin",
        },
        {
          name: "Nguyễn Văn C",
          account: "Ueser 2",
          permission: "Quản lý học viên",
        },
        {
          name: "Nguyễn Văn D",
          account: "uesr 1",
          permission: "Cộng tác viên",
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
      this.formTitle = "Cập nhật tài khoản"; // Change form title when editing
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
