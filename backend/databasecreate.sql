create table user
(
    userID   int auto_increment
        primary key,
    username varchar(50) not null,
    constraint User_userID_uindex
        unique (userID),
    constraint User_username_uindex
        unique (username)
);

create table lobby
(
    lobbyID  int not null
        primary key,
    admin_ID int not null,
    constraint lobby_lobbyID_uindex
        unique (lobbyID),
    constraint lobby_user_userID_fk
        foreign key (admin_ID) references user (userID)
);

create table story
(
    storyID        int auto_increment
        primary key,
    participant_ID int                                 not null,
    lobby_ID       int                                 not null,
    question       enum ('1', '2', '3', '4', '5', '6') null,
    answer         varchar(100)                        not null,
    constraint story_lobby_ID_participant_ID_question_uindex
        unique (lobby_ID, participant_ID, question),
    constraint story_storyID_uindex
        unique (storyID),
    constraint story_lobby_lobbyID_fk
        foreign key (lobby_ID) references lobby (lobbyID),
    constraint story_user_userID_fk
        foreign key (participant_ID) references user (userID)
);

