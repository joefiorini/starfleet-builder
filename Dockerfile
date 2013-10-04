FROM triforce/arch-base
MAINTAINER Joe Fiorini <joe@joefiorini.com>

RUN cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.backup
RUN cp /etc/pacman.d/mirrorlist.pacnew /etc/pacman.d/mirrorlist
RUN sed '/^#\S/ s|#||' -i /etc/pacman.d/mirrorlist
RUN pacman -S --noconfirm reflector
RUN reflector --verbose -l 5 --sort rate --save /etc/pacman.d/mirrorlist
RUN pacman -Syy

RUN pacman -S ruby >=2.0.0_p247-3


RUN pacman -S nodejs >=0.10.20


RUN chown dev /home/dev/.ssh
RUN chown dev /home/dev/.ssh/authorized_keys
RUN chmod 400 /home/dev/.ssh/authorized_keys
RUN ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key

RUN touch /var/log/sshd.log

ADD http://configs.static.triforce.io/configs-0.0.1.tar.gz /configs.tar.gz
RUN tar -xvzf /configs.tar.gz
RUN chown -R dev /home/dev
RUN chgrp -R dev /home/dev


EXPOSE 22

ENTRYPOINT ["/usr/bin/sshd"]

CMD ["-D"]

