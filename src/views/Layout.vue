<template>
<v-app id="inspire">
    <v-navigation-drawer class="sidebar" style="padding: 0; background: rgba(45, 45, 46, 1)" v-model="drawer" app>
        <div class="text-center" style="object-fit: cover; background-color: #fff; height: 83px">
            <img style="height: 100%; width: 100%" src="../assets/verypaylogo.svg" alt="" />
        </div>
        <div>
            <div class="profile_info px-6 py-12" style="font-size: 8px">
                <div class="mr-2"><img src="../assets/avatar.svg" alt="" /></div>
                <div class="center">
                    <h6 class="" style="font-size: 14px padding: 0; margin: 0">
                        Oke Mary Esereosa
                    </h6>
                    <span> okemary@appmart.com </span>
                </div>
            </div>
            <div class="py-3 px-6" style="color: #fff">
                <v-text-field label="Search" prepend-inner-icon="mdi-magnify" outlined filled></v-text-field>
            </div>
            <v-list dense nav style="padding: 0">
                <v-list-item to="#" link style="color: #fff" class="text-center">
                    <v-list-item-content>
                        <v-list-item-title style="text-align: left; padding-left: 4rem">
                            Menu
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item to="" link style="color: #fff" class="text-center">
                    <v-list-item-content>
                        <v-list-item-title style="text-align: left; padding-left: 4rem">
                            Setup
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item to="" link style="color: #fff" class="text-center">
                    <v-list-item-content>
                        <v-list-item-title style="text-align: left; padding-left: 4rem">
                            Menu Box
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="" link style="color: #fff" class="text-center">
                    <v-list-item-content>
                        <v-list-item-title style="text-align: left; padding-left: 4rem">
                            Create Sub Admin
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group :value="false" no-action sub-group style="color: #fff">
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title style="color: #fff">Manage Allowance</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item v-for="(title, i) in [
                 { name: 'Assign Allowance Name', link: '/manage-allowance'},
                   { name: 'Manage Allowance Name', link: '/manage-allowance-name' },
                 { name: 'Non Taxable Allowance', link: '/nonTaxableAllowance'},
                 { name: 'Unit Allowance', link: '/unit-allowance'},   
                  { name: 'Add Exclusion', link: '/add-exclusion'},  
                

               

              ]" :key="i" link :to="title.link" style="color: #fff">
                        <v-list-item-title v-text="title.name"></v-list-item-title>

                    </v-list-item>
                </v-list-group>

                <!-- <v-list-item to="/manage-allowance" link style="color: #fff" class="text-center">
                    <v-list-item-content>
                        <v-list-item-title style="text-align: left; padding-left: 4rem">
                            Manage Allowance
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item to="/allowance" link style="color: #fff" class="text-center">
                    <v-list-item-content>
                        <v-list-item-title style="text-align: left; padding-left: 4rem">
                            Allowance
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item to="/manage-allowance-name" link style="color: #fff" class="text-center">
                    <v-list-item-content>
                        <v-list-item-title style="text-align: left; padding-left: 4rem">
                            Manage Allowance Name
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item> -->

                <v-list-item to="/manage-qulification" link style="color: #fff" class="text-center">
                    <v-list-item-content>
                      
                         <h4>  MANAGE Qualificaton</h4> 
                     
                    </v-list-item-content>
                </v-list-item>

                <v-list-item to="/designation" link style="color: #fff" class="text-center">
                    <v-list-item-content>
                        <v-list-item-title style="text-align: left; padding-left: 4rem">
                            Designation
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group :value="false" no-action sub-group style="color: #fff">
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title style="color: #fff">MDA/Branch</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item v-for="(title, i) in [
                { name: 'Manage MBA/Branch', link: '/mda-branch' },
                { name: 'Department', link: '/mda-department' },
              ]" :key="i" link :to="title.link" style="color: #fff">
                        <v-list-item-title v-text="title.name"></v-list-item-title>
                    </v-list-item>
                </v-list-group>
                <v-list-group :value="false" no-action sub-group style="color: #fff">
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title style="color: #fff">Next Level Approval Setup </v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item v-for="(title, i) in [
                { name: 'Setup', link: '/setup' },
                { name: 'Employee Enrollment', link: '/employee-enrollment' },
                { name: 'Activity Updates', link: '/manageDeduction' },

              ]" :key="i" link :to="title.link" style="color: #fff">
                        <v-list-item-title v-text="title.name"></v-list-item-title>

                    </v-list-item>
                </v-list-group>
                <v-list-group :value="false" no-action sub-group style="color: #fff">
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title style="color: #fff">Deductions</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item v-for="(title, i) in [
                { name: 'Deductions', link: '/deduction' },
                 { name: 'Manage Deductions', link: '/manageDeduction' },
                  { name: 'Non Taxable Deductions', link: '/non-taxable-deduction' },
                 { name: 'Pension Deductions', link: '/pension-deduction' },
                   { name: 'Unit Deduction', link: '/Unit-deduction' },
                    { name: 'Deduction Exclusion', link: '/deductionExclusion' },
                 {name:'New Title', link: '/'},
                 {name:'Next Big Think',link:'/'}

              ]" :key="i" link :to="title.link" style="color: #fff">
                        <v-list-item-title v-text="title.name"></v-list-item-title>

                    </v-list-item>
                </v-list-group>

                <!-- <v-list-item v-for="item in items" :key="item.title" :to="item.to" link style="color: #fff" class="text-center">
                    <v-list-item-content>
                        <v-list-item-title style="text-align: left; padding-left: 4rem">{{
                item.title
              }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item> -->
            </v-list>
        </div>
    </v-navigation-drawer>

    <v-app-bar app class="appBar" elevation="0" color="#fff">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main class="vMain pa-6" style="background-color: #e5e5e5; font-family: 'Mulish'">
        <router-view />
    </v-main>
</v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        // items: [
        //   {
        //     title: "Menu",
        //     icon: "mdi-format-list-checks",
        //     to: "/",
        //   },

        //   { title: "Setup", icon: "mdi-bank", to: "" },
        //   { title: "Menu Box", icon: "mdi-clipboard-text", to: "" },
        //   { title: "Create Sub Admin", icon: "mdi-shield-account", to: "" },
        //   { title: "Manage Allownace", icon: "mdi-lock", to: "/manage-allowance" },
        //   { title: "Designation", icon: "mdi-lock", to: "/designation" },
        //   { title: "MDA/Branch", icon: "mdi-lock", to: "/mda-branch" },
        //   { title: "Deductions", icon: "mdi-lock", to: "/deductions" },
        // ],
    }),
};
</script>

<style>
body {
    font-family: "Mulish", sans-serif;
}

* {
    box-sizing: border-box;
}

.center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: justify;
    font-size: 12px;
}

.center h6,
.center span {
    text-align: left;
    padding: 0;
    margin: 0;
}

.profile_info {
    display: flex;
}

.nav {
    background: #cfdce4;
    color: #fff;
}

.sidebar {
    color: #fff;
}

.appBar {
    background: #fff;
}

.vMain {
    margin-top: 20px;
}
</style>
