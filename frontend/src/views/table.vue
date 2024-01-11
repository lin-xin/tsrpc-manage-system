<template>
    <div>
        <div class="container">
            <div class="search-box">
                <el-input v-model="query.name" placeholder="用户名" class="search-input mr10" clearable></el-input>
                <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
                <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名" align="center"></el-table-column>
                <el-table-column label="账户余额" align="center">
                    <template #default="scope">￥{{ scope.row.money }}</template>
                </el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template #default="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="UPLOADURL + scope.row.thumb"
                            :z-index="10"
                            :preview-src-list="[UPLOADURL + scope.row.thumb]"
                            preview-teleported
                        >
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址" align="center"></el-table-column>
                <el-table-column label="账户状态" align="center">
                    <template #default="scope">
                        <el-tag :type="scope.row.state ? 'success' : 'danger'">
                            {{ scope.row.state ? '正常' : '异常' }}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="date" label="注册时间" align="center"></el-table-column>
                <el-table-column label="操作" width="280" align="center">
                    <template #default="scope">
                        <el-button type="warning" size="small" :icon="View" @click="handleView(scope.row)">
                            查看
                        </el-button>
                        <el-button
                            type="primary"
                            size="small"
                            :icon="Edit"
                            @click="handleEdit(scope.row)"
                            v-permiss="15"
                        >
                            编辑
                        </el-button>
                        <el-button
                            type="danger"
                            size="small"
                            :icon="Delete"
                            @click="handleDelete(scope.row._id)"
                            v-permiss="16"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <el-dialog
            :title="idEdit ? '编辑用户' : '新增用户'"
            v-model="visible"
            width="500px"
            destroy-on-close
            :close-on-click-modal="false"
            @close="closeDialog"
        >
            <TableEdit :data="rowData" :edit="idEdit" :update="updateData" />
        </el-dialog>
        <el-dialog title="查看用户详情" v-model="visible1" width="700px" destroy-on-close>
            <TableDetail :data="rowData" />
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, CirclePlusFilled, View } from '@element-plus/icons-vue';
import { client, UPLOADURL } from '../client';
import TableEdit from '../components/table-edit.vue';
import TableDetail from '../components/table-detail.vue';
import { db_User } from '../shared/protocols/users/db_User';

const query = reactive({
    name: '',
    pageIndex: 1,
    pageSize: 10,
});
const tableData = ref<db_User[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = async () => {
    const ret = await client.callApi('users/Get', {
        query: query,
    });
    if (ret.isSucc) {
        tableData.value = ret.res.data;
        pageTotal.value = ret.res.pageTotal;
    }
};
getData();

// 查询操作
const handleSearch = () => {
    query.pageIndex = 1;
    getData();
};
// 分页导航
const handlePageChange = (val: number) => {
    query.pageIndex = val;
    getData();
};

// 删除操作
const handleDelete = (_id: string) => {
    ElMessageBox.confirm('确定要删除吗？', '提示', {
        type: 'warning',
    })
        .then(async () => {
            const ret = await client.callApi('users/Del', {
                _id,
            });
            if (ret.isSucc) {
                ElMessage.success('删除成功');
                getData();
            }
        })
        .catch(() => {});
};

const visible = ref(false);
const idEdit = ref(false);
const rowData = ref<any>({});
const handleEdit = (row: db_User) => {
    rowData.value = { ...row };
    idEdit.value = true;
    visible.value = true;
};
const updateData = () => {
    closeDialog();
    getData();
};

const closeDialog = () => {
    visible.value = false;
    idEdit.value = false;
};

const visible1 = ref(false);
const handleView = (row: db_User) => {
    rowData.value = { ...row };
    visible1.value = true;
};
</script>

<style scoped>
.search-box {
    margin-bottom: 20px;
}

.search-input {
    width: 200px;
}

.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
