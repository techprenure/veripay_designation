<template>
<div class="">
    <h4 style="font-weight: bolder" class="pa-5">Non Taxable Allowance</h4>
    <v-card>
        <v-row>
            <v-col cols="12">
                <div class="_header px-10 pt-5">
                    <h4 style="font-size: 18px">
                        Non Taxable Allowance - Approved Listing
                    </h4>
                    <div>

                        <v-btn style="font-size: 13px; background-color: #f2f9ff; color: #17517E" elevation="0" @click="dialog2 = true"> Add Non Taxable Allowances</v-btn>
                    </div>
                </div>
            </v-col>
            <v-col cols="12">
                <div>
                    <v-card elevation="0">
                        <v-card-title class="px-10">
                            <v-row>
                                <v-col cols="12">
                                    <!-- <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                      outlined
                    ></v-text-field> -->

                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-data-table :headers="headers" class="table-striped" :items="items">
                          

                            <template v-slot:item.more="{ item }">
                                <v-menu offset-y >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="primary" text v-bind="attrs" v-on="on" :disabled="item.approved == 1">
                                            <img src="../../public/Vector.svg" alt="">
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-btn text block :disabled="item.approved == 1" @click="edit(item)">
                                            <v-list-item>Edit</v-list-item>
                                        </v-btn>
                                        <v-btn text block :disabled="item.approved == 1" @click="deleteAllowance(item)">
                                            <v-list-item>Delete</v-list-item>
                                        </v-btn>
                                    </v-list>
                                </v-menu>
                               
                            </template>
                        </v-data-table>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-card>
       
    <!-- popup for creating  non taxable Allowance -->
    <v-dialog v-model="dialog2" width="400">
        <v-card class="text-center" style="text-align: center">
            <div class="text-h6 text-center pa-4" style="background-color: #f2f9ff; color: #17517e">
                Add Non Taxable Allowance
            </div>
            <div class="px-8 pt-3 pb-12">
                <v-card-text class="mb-3" densed>

                </v-card-text>
                <v-form>
                    <v-select v-model="salaryRegime" :items="SalaryRegime" label="Salary Scale Regime" required outlined></v-select>
                    <v-select v-model="allowanceName" :items="allowanceItems" label="Allowance Name" required outlined></v-select>
                    <v-btn block color="#17517E" style="color: #fff" class="pa-6" @click="createTaxableAllowance">
                        Submit
                    </v-btn>
                </v-form>
            </div>
        </v-card>
    </v-dialog>

    <!-- popup for Editing non taxable Allowance -->
    <v-dialog v-model="dialog" width="400">
        <v-card class="text-center" style="text-align: center">
            <div class="text-h6 text-center pa-4" style="background-color: #f2f9ff; color: #17517e">
                Add Non Taxable Allowance
            </div>
            <div class="px-8 pt-3 pb-12">
                <v-card-text class="mb-3" densed>

                </v-card-text>
                <v-form>
                    <v-select v-model="editSalaryRegime" :items="SalaryRegime" label="Salary Scale Regime" required outlined></v-select>
                    <v-select v-model="editDeductionName" :items="allowanceItems" label="Allowance Name" required outlined></v-select>
                    <v-btn block color="#17517E" style="color: #fff" class="pa-6" @click="editNonTaxableAllowance">
                        Submit
                    </v-btn>
                </v-form>
            </div>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import {
    mapGetters
} from "vuex";

export default {
    data() {
        return {
            dialog2: false,
            headers: [{
                    text: "Action",
                    value: "more",
                },
                {
                    text: "Regime",
                    value: "regime_name",
                },
                {
                    text: "Allowance Name",
                    value: "allowance_name",
                },
                {
                    text: "Entered By",
                    value: "entered_by_name",
                },
                {
                    text: "Entered On",
                    value: "entered_on",
                },
            
            ],
            items: [],
            allowances: null,
            salaryRegime: "",
            deductionName: "",
            regimes: null,
            dialog: false,
            allowance: "",
            allowanceItems: [],
            SalaryRegime: [],
        };
    },

    beforeMount() {
       
        this.populateTaxableDeduction();
        this.findAllowance();
        this.findRegime();
    },

    watch: {
     
    },
    computed: {
        ...mapGetters({
            jwt: "getJwt",
            instu_code: "getInstuCode",
            baseURL: "baseURL"
        }),
    },
    methods: {
       
        // populating Regime
        async findRegime() {
            const res = await axios({
                headers: {
                    Authorization: `Bearer ${this.jwt}`,
                },
                method: "get",
                url: `${this.baseURL}/salary_regime?institution_code=${this.instu_code}`,
            });
            console.log('Test Regime', res);
            res.data.response.message.regimes.forEach(el => {
                console.log(el);
                this.SalaryRegime.push({
                        value: el.regime_code,
                        text: el.regime_name

                    }

                )

            });

        },
        // populating deduction 
        async findAllowance() {

            const res = await axios({
                headers: {
                    Authorization: `Bearer ${this.jwt}`,
                },
                method: "get",
                url: `${this.baseURL}/allowance?institution_code=${this.instu_code}`,
            });
            console.log("network");
            console.log('Find allowance', res);
            res.data.response.message.allowances.forEach(el => {
                this.allowanceItems.push({
                        value: el.allowance_code,
                        text: el.allowance_name

                    }

                )

            });

        },
   

        //Create Allowance Name
        async createTaxableAllowance() {
            if (this.salaryRegime == "" || this.allowanceName == "") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Empty Field!",
                    width: 400,
                });
                this.dialog2 = true;
            } else {
                try {
                    //Create non taxable deduction
                    const res = await axios({
                        headers: {
                            Authorization: `Bearer ${this.jwt}`,
                        },
                        method: "post",
                        url: `${this.baseURL}/non_taxable_allowance`,
                        data: {
                            institution_code: this.instu_code,
                            regime_code: this.salaryRegime,
                            allowance_code: this.allowanceName,
                            entered_by: "9b2b233117"
                        },
                    });

                    console.log("ALLOWANCE RESPONSE", res);
                     const message = res.data.response.message.message;

                    //check for success
                    if (res.data.response.code == "00") {
                        //

                        const el = res.data.response.message.data;
                        console.log("After creating",el);
                        this.items.push({
                            active: el.active,
                            regime_name: el.regime_name,
                           allowance_name: el.allowance_name,
                            entered_by_name: el.entered_by_name,
                            entered_on: el.entered_on.split("T")[0],
                            status: el.active_status,

                        });
                        this.salaryRegime = "",
                        this.allowanceName = "",
                        this.dialog2 = false;
                        return Swal.fire({
                            icon: "success",
                            title: "Created",
                            text: message,
                            width: 400,
                        });
                        //Check if Not created
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Not Created",
                            text: message,
                            width: 400,
                        });
                      
                    
                    }
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Non Taxable Allowance Not Created",
                        width: 400,
                    });
                    console.log(error);
                }
            }
        },

     

        //Populate NON TAXABLE DEDUCTION
        async populateTaxableDeduction() {
            try {
                // console.log("HERE");
                const res = await axios({
                    headers: {
                        Authorization: `Bearer ${this.jwt}`,
                    },
                    method: "GET",
                    url: `${this.baseURL}/non_taxable_allowance?institution_code=${this.instu_code}`,
                });

                console.log("NON TAXABLE DEDUCTION", res);

                if (res.data.response.code == "00") {
                    res.data.response.message.data.forEach((el) => {
                        this.items.push({
                            active: el.active,
                            regime_name: el.regime_name,
                            non_taxable_allowance_code:el.non_taxable_allowance_code,
                           allowance_name: el.allowance_name,
                            entered_by_name: el.entered_by_name,
                            entered_on: el.entered_on.split("T")[0],
                            status: el.active_status,
                        });
                    });
                }
            } catch (err) {
                console.log(err);
            }
        },



        edit(item) {
          this.dialog = true;
          this.editSalaryRegime = item.regime_name;
          this.editDeductionName = item.deduction_name;
          this.nonTaxableAllowanceItem = item;
        },
        ///Edit Allowance
        async editNonTaxableAllowance() {
          // console.log(this.allowanceItem);
          try {
            const res = await axios({
              headers: {
                Authorization: `Bearer ${this.jwt}`,
              },
              method: "put",
              url: `${this.baseURL}/allowance_regime`,

              data: {
                institution_code: this.instu_code,
                entered_by: this.nonTaxableAllowanceItem.enterby,
               regime_code: this.nonTaxableAllowanceItem.regime_code,
                allowance_code: this.nonTaxableAllowanceItem.allow_regime_code,
              
              },
            });

            if (res.data.response.code == "00") {
              const row = this.items.findIndex(
                (el) => el.allow_code === this.allowanceItem.allow_code
              );

              this.items[row].allowance_name = this.allowance_edit;
              this.items[row].salreg = this.salary_edit;

              this.dialogEdit = false;
              return Swal.fire({
                icon: "success",
                text: "Edited Successfully",
                title: "Successful",
                width: 400,
              });
            } else if (res.data.response.code == "E300") {
              Swal.fire({
                icon: "error",
                text: "Non Taxable Allowance Already Exist",
                title: "Oops..",
                width: 400,
              });
            } else if (res.data.response.code == "E301") {
              Swal.fire({
                icon: "error",
                text: "Non Taxable Allowance didn’t update!",
                title: "Oops..",
                width: 400,
              });
            } else {
              Swal.fire({
                icon: "error",
                text: "Error Occured while Editing Non Taxable Allowance",
                title: "Oops..",
                width: 400,
              });
            }
            // console.log("Edit Allowance", res);
          } catch (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              text: "Something went wrong",
              title: "Oops!!",
              width: 400,
            });
          }
        },

        //Delete Allowance
        async deleteAllowance(item) {
          try {
            const res = await axios({
              headers: {
                Authorization: `Bearer ${this.jwt}`,
              },
              // - {‘institution_code’:’’, ‘allowance_code’:’’}
              method: "delete",
              url: `${this.baseURL}/non_taxable_allowance`,
              data: {
                institution_code: this.instu_code,
                non_taxable_allowance_code: item.non_taxable_allowance_code,
                entered_by:item.entered_by_name
              },
            });
            console.log(res);
            if (res.data.response.code == "00") {
              const row = this.items.findIndex(
                (el) => el.allow_code === item.allow_code
              );

              this.items.splice(row, 1);

              return Swal.fire({
                icon: "success",
                text: "Non Taxable Allowance deleted successfully!",
                title: "Successful",
                width: 400,
              });
            } else {
              return Swal.fire({
                icon: "error",
                title: "Non Taxable Allowance not deleted successfully!",
                width: 400,
              });
            }
          } catch (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              text: "Something went wrong",
              title: "Oops!!",
            });
          }
        },
    },
};
</script>

<style>
._header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
@media (max-width: 600px) {
  ._header h4{
    font-size: 6px;
  }

 ._header .btn {
    font-size: 12px;
    width: 100%;
   
  }
  }
/* .theme--light.v-data-table thead tr th {
  color: white;
} */
</style>
