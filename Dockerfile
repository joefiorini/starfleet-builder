FROM schmidh/arch-base
MAINTAINER Joe Fiorini <joe@joefiorini.com>

RUN cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.backup
RUN cp /etc/pacman.d/mirrorlist.pacnew /etc/pacman.d/mirrorlist
RUN sed '/^#\S/ s|#||' -i /etc/pacman.d/mirrorlist
RUN pacman -S --noconfirm reflector
RUN reflector --verbose -l 5 --sort rate --save /etc/pacman.d/mirrorlist
RUN pacman -Syy

RUN pacman -S --noconfirm zsh
RUN pacman -S --noconfirm vim tmux ack
RUN pacman -S --noconfirm tcpdump netcat
RUN useradd -mG wheel -s /bin/zsh dev
RUN usermod -aG tty dev
RUN echo 'LANG="en_US.UTF-8"' > /etc/locale.conf

RUN pacman -S --noconfirm openssh
RUN pacman -S --noconfirm mosh

RUN sed -i 's/^#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
RUN sed -i 's/^UsePAM yes/UsePAM no/' /etc/ssh/sshd_config
RUN mkdir /home/dev/.ssh
RUN curl http://files.static.ly/authorized_keys > /home/dev/.ssh/authorized_keys

RUN sed -i 's/^dev:\!:/:x:/' /etc/shadow
RUN sed -i 's/# \(%wheel ALL=(ALL) NOPASSWD: ALL\)/\1/' /etc/sudoers

RUN chown dev /home/dev/.ssh
RUN chown dev /home/dev/.ssh/authorized_keys
RUN chmod 400 /home/dev/.ssh/authorized_keys
RUN ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key

RUN touch /var/log/sshd.log

ADD .zshrc /home/dev/.zshrc
ADD .zcompdump /home/dev/.zcompdump
ADD .tmux.conf /home/dev/.tmux.conf
RUN chown dev /home/dev/.z*
RUN chgrp dev /home/dev/.z*

EXPOSE 22 60000/udp

ENTRYPOINT ["/usr/bin/sshd"]

CMD ["-D"]
