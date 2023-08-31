import Vue from "vue";
import VueRouter from "vue-router";
import Desgination from "../components/designation.vue";
import ManageAllowance from "../components/ManageAllowance.vue";
import unitAllowance from "../components/unitAllowance.vue";
import unitDeduction from "../components/unitDeduction.vue";
import nonTaxableDeduction from "../components/nonTaxableDeductions.vue";
import EmployeeEnrollment from "../views/employeeEnrollment.vue";
import pensionDeduction from "../components/pensionDeduction.vue";
import ManageAllowanceName from "../components/ManageAllowanceName.vue";
import deductionExclusion from "../components/deductionExclusion.vue";
import createAllowance from "../components/createAllowance.vue";
import nonTaxableAllowance from "../components/nonTaxableAllowance.vue";
import MDA_Branch from "../components/MDA_Branch.vue";
import Setup from "../components/Setup.vue";
import AddExclusion from "../components/addAllowanceExclusion.vue";
import manageQulification from "../components/manageQulifications.vue";
import MDA_Department from "../components/MDA_Department.vue";
// import Add_Designation from "../components/addDesignation.vue";
import deduction from "../components/deduction.vue";
import manageDeduction from "../components/manageDeductions.vue";

import Parent from "../views/Layout.vue";
// import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: Parent,
    children: [
      {
        path: "/dashboard/setup/hr/designation",
        name: "Desgination",
        component: Desgination,
      },
      {
        path: "/dashboard/setup/hr/manage-qualifications",
        name: "manageQulification",
        component: manageQulification,
      },
      {
        path: "/dashboard/setup/hr/manage-allowance",
        name: "ManageAllowance",
        component: ManageAllowance,
      },
       {
        path: "/add-exclusion",
        name: "AddExclusion",
        component: AddExclusion,
      },
      {
        path: "/nonTaxableAllowance",
        name: "nonTaxableAllowance",
        component:nonTaxableAllowance,
      },

      {
        path: "/employee-enrollment",
        name: "EmployeeEnrollment",
        component: EmployeeEnrollment,
      },
      {
        path: "/dashboard/setup/hr/manage-allowance/name",
        name: "ManageAllowanceName",
        component: ManageAllowanceName,
      },
      {
        path: "/setup",
        name: "Setup",
        component:Setup,
      },
      {
        path: "/unit-allowance",
        name: "unitAllowance",
        component: unitAllowance,
      },
      {
        path: "/unit-deduction",
        name: "unitDeduction",
        component: unitDeduction,
      },
      {
        path: "/dashboard/setup/hr/deductions/name",
        name: "ManageDeduction",
        component: manageDeduction,
      },
      {
        path: "/non-taxable-deduction",
        name: "NonTaxableDeduction",
        component: nonTaxableDeduction,
      },
      {
        path: "/pension-deduction",
        name: "PensionDeduction",
        component: pensionDeduction,
      },
      {
        path: "/allowance",
        name: "createAllowance",
        component: createAllowance,
      },
      {
        path: "/deductionExclusion",
        name: "deductionExclusion",
        component: deductionExclusion,
      },
      {
        path: "/dashboard/setup/hr/mda",
        name: "MDA",
        component: MDA_Branch,
      },
      {
        path: "/dashboard/setup/hr/mda/department",
        name: "Department",
        component: MDA_Department,
      },
      // {
      //   path: "/addDesignation",
      //   name: "AddDesignation",
      //   component: Add_Designation,
      // },
      {
        path: "/dashboard/setup/hr/deductions",
        name: "deduction",
        component: deduction,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
