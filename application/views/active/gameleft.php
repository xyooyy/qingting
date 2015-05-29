<div class="sidebar">
    <ul>
        <li>
            <a href="/active/begame1" class=<?php if (stristr($_SERVER[PHP_SELF], '/active/begame')) {
                echo 'active';
            } ?>>
                <i class="sidebar-icon sidebar-create"></i>
            <span>
                新建活动
            </span>
            </a>
        </li>
        <li>
            <a href="/active/index" class=<?php if (stristr($_SERVER[PHP_SELF], '/active/index')) {
                echo 'active';
            } ?>>
                <i class="sidebar-icon sidebar-manage"></i>
            <span>
                活动管理
            </span>
            </a>
        </li>
        <li>
            <a href="/active/ticket" class=<?php if (stristr($_SERVER[PHP_SELF], '/active/ticket')) {
                echo 'active';
            } ?>>
                <i class="sidebar-icon sidebar-number"></i>
            <span>
                券号管理
            </span>
            </a>
        </li>
        <li>
            <a href="/active/games" class=<?php if (stristr($_SERVER[PHP_SELF], '/active/games')) {
                echo 'active';
            } ?>>
                <i class="sidebar-icon sidebar-game"></i>
                <span>
                    游戏中心
                </span>
            </a>
        </li>
        <li>
            <a href="/active/data_center" class=<?php if (stristr($_SERVER[PHP_SELF], '/active/data_center')) {
                echo 'active';
            } ?>>
                <i class="sidebar-icon sidebar-data"></i>
                <span>
                    数据中心
                </span>
            </a>
        </li>
    </ul>
</div>
