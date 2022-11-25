<template>
  <div>
    <h4 style="font-weight: bolder" class="pa-5">Allowance Name</h4>
    <v-card>
      <v-row>
        <v-col cols="12">
          <div class="_header px-10 pt-5">
            <h4 style="font-size: 18px">Manage Allowance Names</h4>
            <div>
              <v-btn
                elevation="0"
                style="font-size: 13px word-spacing: 1px; background-color: #F2F9FF; color:  rgba(23, 81, 126, 1)"
                class="mx-4"
                @click="dialog = true"
                >Add New Allowance Name</v-btn
              >
              <v-btn
                style="font-size: 13px; background-color: #17517e; color: #fff"
                elevation="0"
               
                @click="dialog2 = true"
                >Create Allowance</v-btn
              >
            </div>
          </div>
        </v-col>
        <v-col cols="12">
          <div>
            <v-card elevation="0">
              <v-data-table
                :headers="headers"
                class="table-striped"
                :items="items"
              >
                <template v-slot:item.status="{ item }">
                  <v-btn
                    style="color: red; font-size:10px;text-transform: capitalize"
                    text
                    v-if="item.status"
                    @click="allowance_status(item)"
                    >Deactivate</v-btn
                  >
                  <v-btn
                    v-else
                    style="color: green; font-size:10px; text-transform: capitalize"
                    text
                    @click="allowance_status(item)"
                    >Activate</v-btn
                  >
                </template>

                <template v-slot:item.more="{ item }">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" text v-bind="attrs" v-on="on">
                        <img src="../../public/Vector.svg" alt="">
                      </v-btn>
                    </template>
                    <v-list>
                      <v-btn text block @click="edit(item)">
                        <v-list-item>Edit</v-list-item>
                      </v-btn>
                      <v-btn text block @click="deleteAllowance(item)">
                        <v-list-item>Delete</v-list-item>
                      </v-btn>
                    </v-list>
                  </v-menu>
                </template>
              </v-data-table>
            </v-card>
                 
            <div
              v-if="items.length === 0"
              class="my-16"
              style="text-align: center"
            >
              <v-btn
                elevation="0"
                style=""
                class="add_button mx-4"
                @click="dialog = true"
                >Add New Allowance Name</v-btn
              >
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
      <v-dialog v-model="dialog2" width="400">
      <v-card class="text-center" style="text-align: center">
        <div
          class="text-h6 text-center pa-4"
          style="background-color: #f2f9ff; color: #17517e"
        >
          Create Allowance
        </div>
        <div class="px-8 pt-3 pb-12">
          <v-card-text
            style="font-size: 16px; font-weight: bolder"
            class="mb-3"
            densed
          >
            Create a new allowance to a regime
          </v-card-text>
          <v-form>
            <v-select
              v-model="allowance_name"
              :items="Allowanceitems"
              label="Allowance Name"
              outlined
            ></v-select>
            <v-select
              v-model="salary_regime"
              :items="Salaryitems"
              label="Salary Scale Regime"
              outlined
            ></v-select>
            <v-btn
              block
              color="#17517E"
              style="color: #fff"
              class="pa-6"
              @click="createAllowance"
            >
              Submit
            </v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" width="400">
      <v-card class="text-center" style="text-align: center">
        <div
          class="text-h6 text-center pa-4"
          style="background-color: #f2f9ff; color: #17517e"
        >
          Add Allowance Name
        </div>
        <div class="px-8 pt-3 pb-12">
          <v-card-text
            style="font-size: 16px; font-weight: bolder"
            class="mb-3"
            densed
          >
            Create a new allowance name
          </v-card-text>
          <v-form>
            <v-text-field
              block
              label="Allowance Name"
              v-model="allowance"
              outlined
            >
            </v-text-field>
            <v-btn
              block
              color="#17517E"
              style="color: #fff"
              class="pa-6"
              @click="createAllowance"
            >
              Submit
            </v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEdit" width="400">
      <v-card class="text-center" style="text-align: center">
        <div
          class="text-h6 text-center pa-4"
          style="background-color: #f2f9ff; color: #17517e"
        >
          Edit Allowance Name
        </div>
        <div class="px-8 pt-3 pb-12">
          <v-form>
            <v-text-field
              block
              label="Allowance Name"
              v-model="allowance_edit"
              outlined
            >
            </v-text-field>
            <v-btn
              block
              color="#17517E"
              style="color: #fff"
              class="pa-6"
              @click="editAllowance"
            >
              Edit
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dialogEdit: false,
      allowance_name:"",
      salary_regime:"",
      allowance_edit: "",
      allowance: "",
      tabledata: false,
      dialog: false,
      dialog2: false,
      allowanceItem: null,
      Allowanceitems: [],
      Salaryitems: [ ],
      headers: [
        {
          text: "Action",
          value: "more",
        },
        {
          text: "Allowance Name",
          value: "allowance_name",
        },
        {
          text: "Institution",
          value: "institu",
        },
        {
          text: "Entered By",
          //allowaence name, salary scale regime, institution, Entered by, entered on, status, more
          value: "enterby",
        },
        {
          text: "Entered On",
          value: "enteron",
        },
        {
          text: "Status",
          value: "status",
        },
        // {
        //   text: "",
        //   value: "allow_code",
        //   align: "d-none",
        // },
        // {
        //   text: "",
        //   value: "instu_code",
        //   align: "d-none",
        // },
      ],

      items: [],
    };
  },

  computed: {
    ...mapGetters({
       jwt: "getJwt",
            instu_code: "getInstuCode",
              baseURL:"baseURL"
    }),
  },

  beforeMount() {
    this.AllowanceData();
  },

  methods: {
    edit(item) {
      this.dialogEdit = true;
      this.allowance_edit = item.allowance_name;
      this.allowanceItem = item;
    },

    //Edit Allowance Name
    async editAllowance() {
      console.log(this.allowanceItem);
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${this.jwt}`,
              'Access-Control-Allow-Origin':'*',
          },
          method: "put",
          url: `${this.baseURL}/allowance`,
          data: {
            institution_code: this.instu_code,
            allowance_name: this.allowance_edit,
            allowance_code: this.allowanceItem.allow_code,
          },
        });
        console.log(res);
        if (res.data.response.code == "00") {
          const row = this.items.findIndex(
            (el) => el.allow_code === this.allowanceItem.instu_code
          );

          this.items[row].allowance_name = this.allowance_edit;

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
            text: "Allowance Name Already Exist",
            title: "Oops..",
            width: 400,
          });
        } else if (res.data.response.code == "E301") {
          Swal.fire({
            icon: "error",
            text: "Allowance name didn’t update successfully!",
            title: "Oops..",
            width: 400,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "Error Occured while Editing Allowance Name",
            title: "Oops..",
            width: 400,
          });
        }
        console.log("Edit Allowance", res);
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

    //Delete Allowance Name
    async deleteAllowance(item) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${this.jwt}`,
              'Access-Control-Allow-Origin':'*',
          },
          // - {‘institution_code’:’’, ‘allowance_code’:’’}
          method: "delete",
          url: `${this.baseURL}/allowance`,
          data: {
            institution_code: this.instu_code,
            allowance_code: item.allow_code,
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
            text: "Allowance deleted successfully!",
            title: "Successful",
            width: 400,
          });
        } else {
          return Swal.fire({
            icon: "error",
            title: "Allowance not deleted successfully!",
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

    //Populate Table for allowance list
    async AllowanceData() {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${this.jwt}`,
              'Access-Control-Allow-Origin':'*',
          },
          method: "GET",
          url: `${this.baseURL}/allowance?institution_code=${this.instu_code}`,
        });
        // console.log(res);
        res.data.response.message.allowances.forEach((el) => {
          this.items.push({
            allowance_name: el.allowance_name,
            institu: el.institution,
            enterby: el.entered_by,
            enteron: el.date.split("T")[0],
            status: el.active,
            instu_code: el.institution_code,
            allow_code: el.allowance_code,
          });
        });
      
      
      } catch (error) {
        Swal.fire({
          icon: "info",
          title: "Oops..!",
          text: "Please Reload Page",
          width: 400,
        });
        console.log(error);
      }
    },

    

    //Create Allowance Name
    async createAllowance() {
      if (this.allowance == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Empty Field!",
          width: 400,
        });
        this.dialog = true;
      } else {
        try {
          //Create Allowance Name
          const res = await axios({
            headers: {
              Authorization: `Bearer ${this.jwt}`,
                'Access-Control-Allow-Origin':'*',
            },
            method: "post",
            url: `${this.baseURL}/allowance`,
            data: {
              institution_code: this.instu_code,
              allowance_name: this.allowance,
              entered_by: "Veripay Integrated",
            },
          });     

          //check for success
          if (res.data.response.code == "00") {
            this.allowance = "";
            const el = res.data.response.message.data;
            this.items.push({
              allowance_name: el.allowance_name,
              institu: el.institution,
              enterby: el.entered_by,
              enteron: el.date.split("T")[0],
              status: el.active,
              instu_code: el.institution_code,
              allow_code: el.allowance_code,
            });
            this.dialog = false;

            return Swal.fire({
              icon: "success",
              title: "Created",
              text: "Allowance Name Created",
              width: 400,
            });
            //Check if Not created
          } else if (res.data.response.code == "E203") {
            Swal.fire({
              icon: "error",
              title: "Not Created",
              text: "Allowance Name Not Created",
              width: 400,
            });
            //Check Error
          } else if (res.data.response.code == "E202") {
            Swal.fire({
              icon: "info",
              title: "Not Created",
              text: "Allowance Name Already Exist",
              width: 400,
            });
          }
          this.dialog = false;
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Allowance Not Created",
            width: 400,
          });
          console.log(error);
        }
      }
    },

    // Activate Dactivate Allowance Name
    async allowance_status(item) {
      // console.log(item);
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${this.jwt}`,
              'Access-Control-Allow-Origin':'*',
          },
          method: "patch",
          url: `${this.baseURL}/allowance`,

          data: {
            institution_code: this.instu_code,
            allowance_code: item.allow_code,
            active: !item.status,
          },
        });

        //Check status
        if (res.data.response.code == "00") {
          const row = this.items.findIndex(
            (el) => el.allow_code === item.instu_code
          );

          this.items[row].status = !item.status;

          Swal.fire({
            icon: "success",
            title: "Successful",
            width: 400,
          });
        } else if (res.data.response.code == "E400") {
          Swal.fire({
            icon: "error",
            title: "Allowance Name not Deactivated",
            width: 400,
          });
        } else if (res.data.response.code == "E401") {
          Swal.fire({
            icon: "error",
            title: "Allowance Name not Activated",
            width: 400,
          });
        }
        console.log(res);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error Encounted",
          width: 400,
        });
        console.log(error);
      }
    },
  },
};
</script>

<style>
.add_button {
  font-size: 13px;
  word-spacing: 1px;
  align-items: center;
  justify-content: center;
  background-color: #609cd0;
  color: rgba(23, 81, 126, 1);
}

._header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.no-data {
  text-align: center;
  font-family: Mulish;
  font-size: 20px;
  line-height: 23px;
  color: #bcbfc0;
}


/* .theme--light.v-data-table thead tr th {
  color: white;
} */
</style>
