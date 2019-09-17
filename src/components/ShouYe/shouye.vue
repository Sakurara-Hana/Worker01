<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 查找--search区域 -->
      <div class="search_wrap">
        <el-input
          v-model="listQuery.title"
          placeholder="Title"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-select
          v-model="listQuery.importance"
          placeholder="Imp"
          clearable
          style="width: 90px"
          class="filter-item"
        >
          <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select
          v-model="listQuery.type"
          placeholder="Type"
          clearable
          class="filter-item"
          style="width: 130px"
        >
          <el-option
            v-for="item in calendarTypeOptions"
            :key="item.key"
            :label="item.display_name+'('+item.key+')'"
            :value="item.key"
          />
        </el-select>
        <el-select
          v-model="listQuery.sort"
          style="width: 140px"
          class="filter-item"
          @change="handleFilter"
        >
          <el-option
            v-for="item in sortOptions"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          />
        </el-select>
        <!-- v-waves -->
        <!-- 筛选按钮区域 -->
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >Search</el-button>
      </div>
        <!-- 下载按钮区域 -->
      <div class="down_wrap">
        <el-button
          :loading="downloadLoading"
          class="filter-item"
          type="primary"
          icon="el-icon-download"
          @click="handleDownload"
        >Export</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <el-table 
    id="excel-table"
    v-loading="loading" 
    ref="filterTable" 
    :data="tableData" 
    style="width: 100%">
      <el-table-column prop="id" label="Id" sortable width="80"></el-table-column>
      <el-table-column
     
        prop="date"
        label="日期"
        sortable
        width="180"
        column-key="date"
        :formatter="fmtTime"
      >
        <!-- :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler"-->
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="dialogFormVisible = true" size="mini" type="primary">Edit</el-button>
          <el-button @click="del(scope.row.id)" size="mini" type="danger">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="getShowCount"
      :page-size="pageSize"
      :total="totalCount"
    ></el-pagination>
    <!-- 弹出框--编辑区域 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
           <el-form-item label="Date" :label-width="formLabelWidth">
          <el-date-picker v-model="form.date" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="select_wrap" label="标签" :label-width="formLabelWidth">
          <el-select v-model="form.tag" placeholder="请选择tag">
            <el-option label="家" value="家"></el-option>
            <el-option label="公司" value="公司"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {fetchList , fetchPv, createArticle, updateArticle } from '@/api/article'
// import fetchList from '@/api/article'
// import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'  //格式化时间
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import FileSaver from "file-saver";
import XLSX from "xlsx";

import _ from "../utils/format";
const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" }
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce(
  (acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {}
);

export default {
  name: "ComplexTable",
  // components: { Pagination },
  // directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  data() {
    return {
      totalCount: 3, //分页的总页码
      pageSize: 2, //一页有多少条
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      loading: false,
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          tag: "公司"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          tag: "家"
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          tag: "公司"
        },
        {
          id: 5,
          date: "2016-04-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          tag: "公司"
        },
        // {
        //   id: 1,
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   tag: "家"
        // },
        // {
        //   id: 2,
        //   date: "2016-05-04",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1517 弄",
        //   tag: "公司"
        // },
        // {
        //   id: 3,
        //   date: "2016-05-01",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1519 弄",
        //   tag: "家"
        // },
        // {
        //   id: 4,
        //   date: "2016-05-03",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1516 弄",
        //   tag: "公司"
        // },
        // {
        //   id: 5,
        //   date: "2016-04-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1516 弄",
        //   tag: "公司"
        // },
        // {
        //   id: 1,
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   tag: "家"
        // },
        // {
        //   id: 2,
        //   date: "2016-05-04",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1517 弄",
        //   tag: "公司"
        // },
        // {
        //   id: 3,
        //   date: "2016-05-01",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1519 弄",
        //   tag: "家"
        // },
        // {
        //   id: 4,
        //   date: "2016-05-03",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1516 弄",
        //   tag: "公司"
        // },
        // {
        //   id: 5,
        //   date: "2016-04-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1516 弄",
        //   tag: "公司"
        // },
      ],

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" }
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" }
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change"
          }
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    // this.getList();
    // this.getShowList();
  },
  methods: {
    getShowCount() {
      this.totalCount = 3;
    },
    getShowList() {
      var _this = this;
      this.$axios
        .get("http://www.liulongbin.top:3005/api/getnewslist")
        .then(function(response) {
          console.log("get");
          if (response.status == 0) {
            _this.tableData = response.message;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    del(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.map((n, index) => {
            if (n.id == id) {
              this.tableData.splice(index, 1);
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    fmtTime(row, column, cellValue, index) {
      var time = _.convertMysqlTime2JSTime(cellValue);
      return time.getFormatDate() + "   " + time.getFormatTime();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    getList() {
      // this.listLoading = true;
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total

      //   // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作Success",
        type: "success"
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        status: "published",
        type: ""
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.author = "vue-element-admin";
          // createArticle(this.temp).then(() => {
          //   this.list.unshift(this.temp)
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: 'Success',
          //     message: 'Created Successfully',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // updateArticle(tempData).then(() => {
          //   for (const v of this.list) {
          //     if (v.id === this.temp.id) {
          //       const index = this.list.indexOf(v)
          //       this.list.splice(index, 1, this.temp)
          //       break
          //     }
          //   }
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: 'Success',
          //     message: 'Update Successfully',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      });
    },
    handleDelete(row) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000
      });
      const index = this.list.indexOf(row);
      this.list.splice(index, 1);
    },
    //  handleFetchPv(pv) {
    //    fetchPv(pv).then(response => {
    //     this.pvData = response.data.pvData
    //      this.dialogPvVisible = true
    //    })
    // },
    handleDownload() {
      // this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["id", "时间", "姓名", "地址", "标签"];
        const filterVal = [
          "id",
          "date",
          "name",
          "address",
          "tag"
        ];
        const data = this.formatJson(filterVal, this.tableData)
        console.log(data);
        // const data = this.tableData;
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list"
        });
        // this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "id") {//这里其实是格式化的一个判断，如没有要格式化的字段可以不用次判断
            // return parseTime(v[j])
            return v[j];
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}`
        ? "ascending"
        : sort === `-${key}`
        ? "descending"
        : "";
    }
  }
};
</script>
<style scope>
div.filter-container .filter-item {
  margin-left: 10px;
}
div.filter-container{
  display: flex;
  /* justify-content: space-between; */
  justify-content: space-around;
}
button.el-button--mini {
  margin-left: 10px;
}
div.el-pagination {
  padding: 35px 5px;
}

/* 弹出层区域 */
div.el-dialog{
  /* width: 40%; */
}
div.el-form-item__content{
  /* margin-left: 60px !important; */
}

div.el-date-picker{
  /* width: 100%; */
}
div.el-input{
  /* width: 70%; */
}
div.el-select {
   /* margin-left: 60px ; */
   
   /* width: 80%; */
}
</style>
