#!/bin/sh

 git filter-branch -f --env-filter "
    GIT_AUTHOR_NAME='koki'
    GIT_AUTHOR_EMAIL='2788293436@qq.com'
    GIT_COMMITTER_NAME='koki'
    GIT_COMMITTER_EMAIL='2788293436@qq.com'
  " HEAD
