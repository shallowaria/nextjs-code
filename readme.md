public 文件夹的特殊作用
路径直接映射： 如果你存放了一张图片：public/logo.png，那么在代码或浏览器中访问它的路径就是 /logo.png。 不需要使用 ../public/logo.png 这种相对路径。

存放元数据文件： 像 favicon.ico（网站图标）、robots.txt（爬虫指引）、sitemap.xml（站点地图）这类需要放在网站根目录下的文件，必须放在 public 中。

不受构建混淆： Next.js 在打包时，会对 src 或 app 目录下的代码进行压缩和重命名（为了缓存优化），但 public 目录里的文件会保持原样。

## git

① 添加「上游仓库」（只做一次）

`git remote add upstream https://github.com/mschwarzmueller/nextjs-course-code.git
`

`git remote -v
origin    https://github.com/shallowaria/nextjs-code.git (fetch)
upstream  https://github.com/mschwarzmueller/nextjs-course-code.git (fetch)
`
② 把 upstream 的所有分支拉下来
git fetch upstream
`git branch -a
remotes/upstream/03-prj-routing
remotes/upstream/03-prj-routing-extra-files
remotes/upstream/04-data-fetching
...
`

③ 切换到你要的那个分支（并在本地创建跟踪）
`git switch -c 03-prj-routing-extra-files upstream/03-prj-routing-extra-files`

总结:
`git remote add upstream https://github.com/mschwarzmueller/nextjs-course-code.git
git fetch upstream
git switch -c <branch-name> upstream/<branch-name>
git push origin <branch-name>`

你想干嘛 老写法 新写法（推荐）
切换分支 git checkout dev git switch dev
新建并切换 git checkout -b dev git switch -c dev
回退文件 git checkout -- a.js git restore a.js

分开做:
1:在当前 HEAD 上创建一个本地分支
git switch -c 03-prj-routing-extra-files

2.1:让这个分支 = 上游的某个分支
git fetch upstream
git reset --hard upstream/03-prj-routing-extra-files //本地分支的指针指向上游分支的提交上 --hard 会丢弃当前分支的修改，如果已经写了就不行

2.2： 不 reset 掉本地代码 只追踪绑定关系
git fetch upstream
git branch --set-upstream-to=upstream/03-prj-routing-extra-files

3. 绑定「上游跟踪关系」
   git branch --set-upstream-to=upstream/03-prj-routing-extra-files

删除分支:
// 删除本地分支 git branch -d localBranchName
// 删除远程分支 git push origin --delete remoteBranchName
// 查看远程分支： git branch -r

本地分支 ≠ 远程分支 ≠ 远程追踪分支
本地分支: feature/login
远程分支: origin 上的 feature/login
远程追踪分支: origin/feature/login（本地的影子）

// 回退：改乱了，还没 commit
git restore file.js === git checkout -- file.js
// 已经 git add 了，但后悔了
git restore --staged file.js
//回到“更早的一次提交”：把文件内容回退到 两次提交之前
git restore --source=HEAD~2 file.js

// merge
merge = 把两条“已经分叉的时间线”合并
`main: A──B──C
feature:    └──D──E`
执行
git switch main
git merge feature

````main: A──B──C──┐
                ├──M
feature:        └──D──E```
M = 合并提交（merge commit）,历史是 真实发生过的,不改任何已有提交

// rebase
rebase = 把你的提交“挪到”另一条时间线后面
```main: A──B──C
feature:     └──D──E```
执行
git switch feature
git rebase main
```main:    A──B──C
feature:       └──D'──E'```
D' E' = 新提交
旧的 D E 被“重写”了
rebase 会“改写历史”
所以：
❌ 不要对已经 push 给别人用的分支 rebase
✅ 只在你自己本地的 feature 分支用

实用：

### 我在 feature 分支

git fetch origin
git rebase origin/main # 把最新 main 接进来

### 功能完成

git switch main
git merge feature

```你想干嘛          用什么
改坏文件，想恢复 git restore
两条线汇合       git merge
整理提交历史     git rebase```

<label htmlFor="year">Year</label>
<select id="year">

   <option value="2021">2021</option>
   <option value="2022">2022</option>
</select>
htmlFor 和 id: 点击文字Year select也能获得焦点

const selectedYear = yearInputRef.current.value; 所有 selected element in javascript 都有 value 属性

const router = useRouter(); 再次强调 hooks 不能在嵌套语句中 call

useRef 的工作原理
当你写下 const yearInputRef = useRef(); 时，你创建了一个名为 yearInputRef 的“钩子”。

绑定： <select ref={yearInputRef}> 告诉 React：“把这个真实的 HTML 元素存到我的钩子里去”。

存储： React 会把这个 DOM 元素的引用放在 yearInputRef.current 中。

提取： yearInputRef.current.value 就像是在用原生 JS 写 document.getElementById('year').value，但它是 React 推荐的安全方式。
````
