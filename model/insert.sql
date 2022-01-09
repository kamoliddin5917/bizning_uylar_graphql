INSERT INTO users(user_firstname, user_lastname, user_email, user_password) VALUES
('Kamoliddin', 'Jamoliddinov', 'k@gmail.com','k'),
('Umida', 'Hanimqulova', 'u@gmail.com','u'),
('Malika', 'Murodova', 'm@gmail.com','m'),
('Sevinch', 'Valiyeva', 's@gmail.com','s'),
('Shoista', 'Abdujabborova', 'sh@gmail.com','sh'),
('Dilshoda', 'Toxirova', 'd@gmail.com','d');


INSERT INTO companies(company_name,company_media,company_inform,company_owner) VALUES
('UcharTeam', ARRAY ['https://cdn5.vectorstock.com/i/1000x1000/68/04/letter-k-royal-crown-luxury-logo-design-vector-32696804.jpg'],'Eng zo''r kompanya','371c8eda-e874-4a3c-aa36-2c3ff32ff33e');
INSERT INTO companies(company_name,company_media,company_inform,company_owner) VALUES
('MurodBuildings', ARRAY ['https://www.mbc.uz/includes/images/new_layout/logo.svg'],'Zo''r kompanya','e0f4e3d5-2f13-454a-a144-d497e7787bad');
INSERT INTO companies(company_name,company_media,company_inform,company_owner) VALUES
('Avenue', ARRAY ['https://capitalhotelgroup.imgix.net/b48ad210d2113e5bf76c754a41419f17/579864eb0305a8.14228714.png?ixlib=php-1.2.1&s=6b9cda46e6722a8592a60c355fe77504'],'Sizga yoqadigan','ebffdd72-5d42-433f-81f9-57f8b5ca02d6');

INSERT INTO complexes(complex_name,complex_media,complex_inform,complex_company) VALUES
('UcharTeam Oldinga', ARRAY ['https://images.unsplash.com/photo-1562660474-d20c6b33478e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGFsbGVzdCUyMGJ1aWxkaW5nfGVufDB8fDB8fA%3D%3D&w=1000&q=80'], 'mazza qilib yashen','7766bc86-9c8c-4dfd-a3ea-6932faa268c3'),
('UcharTeam Olg''a', ARRAY ['https://www.civitatis.com/blog/wp-content/uploads/2021/09/edificios-altos-mundo.jpg'], 'mazza qilib yashen','7766bc86-9c8c-4dfd-a3ea-6932faa268c3'),
('MurodBuildings Nest One', ARRAY ['https://www.gazeta.uz/media/img/2020/03/dbT6Xw15832233644022_b.jpg'], 'soltib olish kam bo''misiz','415c2a6a-ac8d-4ab3-9035-e1d20ad53095'),
('MurodBuildings Nest Two', ARRAY ['https://www.mbc.uz/files/images/optimized/opt__1600__6ddf4a1fad8de194bda93008ffc236c4_70.jpg700/700'], 'soltib olish kam bo''misiz','415c2a6a-ac8d-4ab3-9035-e1d20ad53095'),
('Mirobod Avenue', ARRAY ['https://mirabad.uz/upload/kelnik.adminpage/faf/faf7854c28253b616df062213da1f9f9.jpg'], 'ko''ring va sotib oling','2560a227-cade-4779-af06-09557469f2d4'),
('Yashnobod Avenue', ARRAY ['https://mirabad.uz/upload/resize_cache/resized/w2760/933901ef0233fc82d20f86d7ebb23352.jpg'], 'ko''ring va sotib oling','2560a227-cade-4779-af06-09557469f2d4');

INSERT INTO houses(house_floor,house_room,house_kvm,house_kvm_sum,house_media,house_inform,house_complex) VALUES
(1,10,100,10000000,ARRAY ['https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/hotels/51000000/50880000/50878600/50878533/c2f482b9_z.jpg?tr=q-40,c-at_max,w-740,h-500&_src=imagekit'],'ko''ring va baho bering','c3c6d922-7c53-4765-9faf-8cc56f4845c1'),
(7,6,100,5000000,ARRAY ['https://i.pinimg.com/originals/9a/af/78/9aaf783209e670d72b883dbde6c0f4c0.jpg'],'ko''ring va baho bering','c3c6d922-7c53-4765-9faf-8cc56f4845c1'),
(77,4,100,70000000,ARRAY ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMHIi5ug5LktZX4gn2u3ixMN-OuRciRhD9iP_aHKv9zmtY4HPRoumKGnABHqq8QB4W0TQ&usqp=CAU'],'ko''ring va baho bering','c3c6d922-7c53-4765-9faf-8cc56f4845c1'),
(5,10,100,10000000,ARRAY ['https://image.winudf.com/v2/image1/Y29tLmVsZ2VuZHJvaWQuYmlnaG91c2VwbGFuX3NjcmVlbl8wXzE1NjcwODE1NDRfMDM4/screen-0.jpg?fakeurl=1&type=.jpg'],'ko''ring va baho bering','3d2f36a4-3fd3-4184-be90-a8e352f8cee9'),
(50,8,100,70000000,ARRAY ['https://i.pinimg.com/originals/af/47/f5/af47f5588a3e230f20be7865192eb878.jpg'],'ko''ring va baho bering','3d2f36a4-3fd3-4184-be90-a8e352f8cee9'),
(55,4,100,90000000,ARRAY ['https://i.pinimg.com/originals/8b/a4/16/8ba416ecf5bdb249af02027b5f878188.jpg'],'ko''ring va baho bering','3d2f36a4-3fd3-4184-be90-a8e352f8cee9'),
(1,10,90,7000000,ARRAY ['https://miatugcu.com/wp-content/uploads/2020/08/nest-one-offices-2-2.jpg'],'baho bering','04fa8c77-07a8-4193-9678-f09c7a3fb416'),
(5,4,50,4000000,ARRAY ['https://nestone.uz/img/offices-plans/CBLOK_1.png'],'baho bering','04fa8c77-07a8-4193-9678-f09c7a3fb416'),
(5,4,70,9000000,ARRAY ['https://cf.bstatic.com/xdata/images/hotel/max1024x768/290760384.jpg?k=d2accbaf387b001986463bad0c50bfb7efaa2d61425e8f3408439cbc1f744b20&o=&hp=1'],'baho bering','cb20cb0f-c884-4682-a3ab-461eb3f3f465'),
(7,10,90,4000000,ARRAY ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREA6OxqYLNLUEPvnA832rMXWhgqV-l9_8gCg&usqp=CAU'],'baho bering','cb20cb0f-c884-4682-a3ab-461eb3f3f465'),
(7,10,80,7000000,ARRAY ['https://i.ytimg.com/vi/BYWlOHO5fjw/maxresdefault.jpg'],'zo''rmi','694e2d44-86a1-4e1b-a0e2-c5b9098531b5'),
(10,6,50,7000000,ARRAY ['https://www.gazeta.uz/media/img/2020/12/Iu4Rpc16087887703955_b.jpg'],'zo''rmi','694e2d44-86a1-4e1b-a0e2-c5b9098531b5'),
(1,8,70,5000000,ARRAY ['https://lh3.googleusercontent.com/proxy/hIs4D5Dfrinfu058EthcxjLCGvju7EcrwFBuY1CMQ0hCOF01918KkXGi2kT4fb4M7gBlMtkshuanAJ2ETsKDK8r0WX9QH5SRGp_BNFADOWO3fTzC'],'zo''rmi','94a8dc03-3203-4254-a853-d268c2be78e6'),
(7,10,90,8000000,ARRAY ['https://mirabad.uz/upload/kelnik.adminpage/58f/58fc4f82e7744362303e092ebd2c15c1.jpg'],'zo''rmi','94a8dc03-3203-4254-a853-d268c2be78e6');

INSERT INTO banks(bank_name,bank_kridit_sum,bank_kridit_time,bank_email,bank_media,bank_inform) VALUES
('UcharTeam bank',9000000000,77,'ut@gmail.com',ARRAY ['https://cdn.cnn.com/cnnnext/dam/assets/131113140736-beautiful-bank-buildings---saxo-bank-horizontal-large-gallery.jpg'],'mazza qilib ishlating qaytarmasezam mayli :)' ),
('Ipoteka bank',2000000000,40,'i@gmail.com',ARRAY ['https://www.ipotekabank.uz/upload/ipoteka-new_big.jpg'],'mazza qilib ishlating qaytarmasezam mayli :)' ),
('Asaka bank',1500000000,40,'a@gmail.com',ARRAY ['https://uznews.uz/upload/cache/57/34/57344a5d067494ec94fe64303269e00b.jpg'],'mazza qilib ishlating qaytarmasezam mayli :)' ),
('Ravnaq bank',1000000000,40,'r@gmail.com',ARRAY ['https://avatars.mds.yandex.net/get-altay/1580511/2a0000016ec9fda9a865dd1faedde590ca34/XXXL'],'mazza qilib ishlating qaytarmasezam mayli :)' ),
('Infin bank',900000000,40,'it@gmail.com',ARRAY ['https://avatars.mds.yandex.net/get-altay/2057543/2a0000016da63b4d999bfa18fd81a631c82f/XXL'],'mazza qilib ishlating qaytarmasezam mayli :)' ),
('Tenge bank',800000000,40,'te@gmail.com',ARRAY ['https://www.spot.uz/media/img/2019/11/JgpzBt15742292588650_b.jpg'],'mazza qilib ishlating qaytarmasezam mayli :)' ),
('Asia Aliance bank',700000000,30,'aa@gmail.com',ARRAY ['https://aab.uz/upload/iblock/418/41823559dcb86e2c065167cf3884aa92.jpg'],'mazza qilib ishlating qaytarmasezam mayli :)' ),
('Kapital bank',600000000,25,'kb@gmail.com',ARRAY ['https://kapitalbank.uz/upload/imager/182c62d862921358613767ce7a30108e.jpg'],'mazza qilib ishlating qaytarmasezam mayli :)' ),
('Usha bank',500000000,20,'ush@gmail.com',ARRAY ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUhX9zdMD-DrxbQccm4bfWGJK7f0bJBwdngw&usqp=CAU'],'mazza qilib ishlating qaytarmasezam mayli :)' ),
('Topvol bank',400000000,15,'tp@gmail.com',ARRAY ['https://bsmedia.business-standard.com/_media/bs/img/article/2020-09/21/full/1600708212-444.jpg'],'mazza qilib ishlating qaytarmasezam mayli :)' ),
('Shude bank',300000000,10,'shu@gmail.com',ARRAY ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiYifStnxcQkVrJXZLv8ABGvuk4Ri25gykww&usqp=CAU'],'mazza qilib ishlating qaytarmasezam mayli :)' ),
('NBU bank',2000000000,30,'tt@gmail.com',ARRAY ['https://www.gazeta.uz/media/img/2017/08/Nz356R15032474538130_b.jpg?r=1510828079'],'mazza qilib ishlating qaytarmasezam mayli :)' ),
('Xalq bank',150000000,7,'x@gmail.com',ARRAY ['https://media.az/file/articles/2020/08/17/1597678571_845cc197a7de9d7.jpg'],'mazza qilib ishlating qaytarmasezam mayli :)' );