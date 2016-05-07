FROM komukomo/centos-sshd:6.5
MAINTAINER komukomo <komukomo@users.noreply.github.com>

RUN yum groupinstall -y "Development tools" | true
RUN yum install -y yum-utils createrepo rpmdevtools tar | true
ADD CentOS-Source.repo /etc/yum.repos.d/
RUN useradd -s /sbin/nologin mockbuild
