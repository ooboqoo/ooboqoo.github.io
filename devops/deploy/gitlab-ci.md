# GitLab CI

https://www.jianshu.com/p/705428ca1410  
https://segmentfault.com/a/1190000006120164  
https://docs.gitlab.com/ee/ci/examples/deployment/composer-npm-deploy.html

触发自动构建有两个方案
  * 基于 GIT HOOKS 的行为触发
  * 基于 GITLAB-CI 的一系列部署


## Variables

https://docs.gitlab.com/ee/ci/variables/

### 预定义(环境)变量

|||
|----------------------|----------------------------------------------
| CI_PROJECT_ID        | The unique id of the current project that GitLab CI uses internally
| CI_PROJECT_NAME      | The project name that is currently being built (actually it is project folder name)
| CI_PROJECT_NAMESPACE | The project namespace (username or groupname) that is currently being built
| CI_PROJECT_PATH      | The namespace with project name
| CI_PROJECT_PATH_SLUG | `$CI_PROJECT_PATH` lowercased and with everything except `0-9` and `a-z` replaced with `-`. Use in URLs and domain names.
|||
| CI_COMMIT_TAG        | The commit tag name. Present only when building tags.
| CI_COMMIT_REF_NAME   | The branch or tag name for which project is built

9.0 Renaming

| 8.x name (Deprecated) | 9.0+ name
|-----------------------|--------------
| CI_BUILD_TAG          | CI_COMMIT_TAG
| CI_BUILD_REF_NAME     | CI_COMMIT_REF_NAME

```bash
variables:
  LS_CMD: 'ls $FLAGS $$TMP_DIR'
  FLAGS: '-al'
script:
  - 'eval $LS_CMD'  # will execute 'ls -al $TMP_DIR'
```


## 配置 .gitlab-ci.yml

https://docs.gitlab.com/ee/ci/yaml/

