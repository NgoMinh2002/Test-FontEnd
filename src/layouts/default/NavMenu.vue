<template>
  <v-app app>
    <v-app-bar app class="white" dark elevation="3" flat>
      <v-app-bar-nav-icon
        app
        class="text-blue-darken-3"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-row row wrap class="ml-5">
        <div class="d-flex align-center">
          <v-img
            alt=""
            class="shrink mr-2"
            contain
            src="@/assets/logo.svg"
            transition="scale-transition"
            width="70"
          />
          <span class="text-blue-darken-3 my-custom-text-size"
            >Lotus Academy</span
          >
        </div>
      </v-row>
      <v-spacer> </v-spacer>
      <div class="mr-5">
        <div class="d-flex align-center">
          <v-avatar width="100"
            ><v-img src="@/assets/logo.jpg"></v-img
          ></v-avatar>
          <span class="black--text ml-3">Admin</span>
          <div>
            <v-menu transition="scale-transition">
              <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props" color="primary" dark
                  ><v-icon class="mdi mdi-menu-down"></v-icon>
                </v-btn>
              </template>
              <v-list density="compact">
                <v-list-item link router color="light-blue-accent-4">
                  <template v-slot:prepend>
                    <v-icon>mdi-cog-outline</v-icon>
                  </template>
                  <PersonalInformation></PersonalInformation>
                </v-list-item>
                <v-list-item link router color="light-blue-accent-4" to="/">
                  <template v-slot:prepend>
                    <v-icon>mdi-logout</v-icon>
                  </template>
                  <v-list-item-title>Đăng Xuất</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-if="!isLoginPage"
      absolute
      color="white"
      elevation="1"
      v-model="drawer"
    >
      <v-row wrap row>
        <v-col clos="12">
          <v-list v-model:opened="open">
            <v-list-item-group v-model="model" color="indigo">
              <v-list-item
                v-for="(item, i) in links"
                :key="i"
                link
                color="light-blue-accent-4"
                router
                :to="item.router"
              >
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item>
            </v-list-item-group>

            <v-list-group :value="outline" color="indigo">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-view-grid-outline"
                  title="Quản lý chung"
                ></v-list-item>
              </template>
              <v-list-item-group color="indigo">
                <v-list-item
                  v-for="(item, i) in listlinks"
                  :key="i"
                  link
                  router
                  color="light-blue-accent-4"
                  :value="item"
                  :to="item.router"
                >
                  <v-list-item-title>{{
                    item.text
                  }}</v-list-item-title></v-list-item
                >
              </v-list-item-group>
            </v-list-group>
          </v-list>
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <v-main>
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>
<script>
import PersonalInformation from "@/views/PersonalInformation.vue";
export default {
  components: {
    PersonalInformation,
  },
  name: "MenuNavigation",
  data: () => ({
    model: 0,
    open: ["outline"],
    drawer: false,
    gruop: null,
    items: [
      {
        icon: "mdi-cog-outline",
        text: "Cài Đặt thông tin cá nhân",
      },
      { icon: "mdi-logout", text: "Đăng Xuất", router: "/" },
    ],
    links: [
      {
        icon: "mdi-account-outline",
        title: "Quản lý tài khoản",
        router: "/AccountManagement",
      },
      {
        icon: "mdi-account-school-outline",
        title: "Quản lý học viên",
        router: "/StudentManagement",
      },
      {
        icon: "mdi-book-variant",
        title: "Quản lý Khóa học",
        router: "/coursemanagement",
      },
      {
        icon: "mdi-text-box-edit-outline",
        title: "Quản lý bài viết",
        router: "/ArticleManagement",
      },
    ],
    listlinks: [
      { text: "Quyền hạn" },
      { text: "Loại bài viết" },
      { text: "Chủ đề" },
      { text: "Loại khóa học" },
      { text: "Tình trạng học" },
    ],
  }),
  watch: {
    gruop() {
      this.drawer = false;
    },
  },
  computed: {
    isLoginPage() {
      //  return this.$route.name === "/";
      return this.$route.path.includes("/Login");
    },
    isLoginPages() {
      return this.$route.name === "/Login";
      //return this.$route.path.includes("/login");
    },
  },
};
</script>
<style scoped>
.my-custom-text-size {
  font-size: 25px;
  font-weight: bold;
}
.black--text {
  font-weight: 500;
}
</style>
