import { TypeChat } from '../../Enums/commonEnums';
import { MailType } from '../../Types/commonTypes';

const dataInbox = [
  {
    uuid: 1,
    read: false,
    author: 'Khoi Trannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnmnnnnnnnnnnnnnnn',
    subject:
      'Nghe đồn anh thích màu xanh? Còn em thì lại thích anh chẳng rời.Hình như anh thích bầu trời?Còn em thì thích một đời bên anh.',
    type: TypeChat.INBOX,
    inbox: [
      {
        uuid: 111,
        read: true,
        author: 'Khoi Tran',
        subject: 'Hello from KhoiTran',
        type: TypeChat.SENT,
        content:
          'Ta chỉ là chiếc lá </br> Việc của mình là xanh</br> Ta chỉ là quả chanh</br> Chờ một người đến vắt</br>Ta chỉ là đôi mắt </br>Ngơ ngác nhìn đời trôi</br>Ta chỉ là bờ môi</br>Muốn chạm vào ai quá!',
        time: '2023-05-30T03:29:57+00:00',
        address: 'khoi.tran@techupcorp.com',
        from_user: {
          uuid: 311,
          username: 'user1@sendemail.techupcorp',
          first_name: 'Khoi',
          last_name: 'Tran',
          email: 'user1@sendemail.techupcorp',
          roles: [
            {
              uuid: 1,
              name: 'User',
            },
          ],
        },
      },
      {
        uuid: 112,
        read: true,
        author: 'Khoi Tran',
        type: TypeChat.SENT,
        subject: 'Hello from KhoiTran',
        content:
          'Ta chỉ là chiếc lá </br> Việc của mình là xanh</br> Ta chỉ là quả chanh</br> Chờ một người đến vắt</br>Ta chỉ là đôi mắt </br>Ngơ ngác nhìn đời trôi</br>Ta chỉ là bờ môi</br>Muốn chạm vào ai quá!',
        time: '2023-05-30T03:29:57+00:00',
        address: 'khoi.tran@techupcorp.com',
        from_user: {
          uuid: 311,
          username: 'user1@sendemail.techupcorp',
          first_name: 'Khoi',
          last_name: 'Tran',
          email: 'user1@sendemail.techupcorp',
          roles: [
            {
              uuid: 1,
              name: 'User',
            },
          ],
        },
      },
      {
        uuid: 113,
        read: true,
        author: 'Khoi Tran',
        type: TypeChat.INBOX,
        subject: 'Hello from KhoiTran',
        content: 'I just assign task for you. Please check at https:// and feedback for me.',
        time: '2023-05-30T03:29:57+00:00',
        address: 'khoi.tran@techupcorp.com',
        from_user: {
          uuid: 311,
          username: 'khoi.tran@techupcorp.com',
          first_name: 'Khoi',
          last_name: 'Tran',
          email: 'khoi.tran@techupcorp.com',
          roles: [
            {
              uuid: 1,
              name: 'User',
            },
          ],
        },
      },
      {
        uuid: 114,
        read: true,
        author: 'Khoi Tran',
        type: TypeChat.INBOX,
        subject: 'Hello from KhoiTran',
        content: 'I just assign task for you. Please check at https:// and feedback for me.',
        time: '2023-05-30T03:29:57+00:00',
        address: 'khoi.tran@techupcorp.com',
        from_user: {
          uuid: 311,
          username: 'khoi.tran@techupcorp.com',
          first_name: 'Khoi',
          last_name: 'Tran',
          email: 'khoi.tran@techupcorp.com',
          roles: [
            {
              uuid: 1,
              name: 'User',
            },
          ],
        },
      },
      {
        uuid: 115,
        read: true,
        author: 'Khoi Tran',
        type: TypeChat.INBOX,
        subject: 'Hello from KhoiTran',
        content: 'I just assign task for you. Please check at https:// and feedback for me.',
        time: '2023-05-30T03:29:57+00:00',
        address: 'khoi.tran@techupcorp.com',
        from_user: {
          uuid: 311,
          username: 'khoi.tran@techupcorp.com',
          first_name: 'Khoi',
          last_name: 'Tran',
          email: 'khoi.tran@techupcorp.com',
          roles: [
            {
              uuid: 1,
              name: 'User',
            },
          ],
        },
      },
    ],
    content:
      '<h2>1. Chế độ ăn eat clean là gì?</h2><p style="margin-left:0px;">Eat clean sử dụng các loại thực phẩm càng gần với trạng thái tự nhiên giúp cung cấp lợi ích dinh dưỡng tối đa. Lựa chọn thực phẩm có phẩm chất tốt và bền vững cũng là một phần của “eat clean”.</p><p style="margin-left:0px;">Các nguyên tắc cơ bản của eat clean sẽ khuyến khích bạn tiêu thụ nhiều thực phẩm nguyên chất hơn như: trái cây, rau, protein nạc, <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/chon-ngu-coc-nguyen-hat-de-tang-cuong-suc-khoe-va-giup-ban-giam-can/"><strong>ngũ cốc nguyên hạt</strong></a> và <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/chat-beo-lanh-manh-anh-huong-tot-toi-suc-khoe-nhu-nao/"><strong>chất béo lành mạnh</strong></a> và đồng thời, hạn chế thực phẩm ăn nhanh đã qua chế biến, đồ ngọt và các loại thực phẩm đóng gói khác.</p><p style="margin-left:0px;">Một ví dụ về bữa ăn có tất cả những thực phẩm này sẽ là món salad rau bina với gà nướng, hạt diêm mạch, quả bơ, quả óc chó và lát táo.</p><h2>2. Các mẹo khác để “eat clean”</h2><ul><li>Hạn chế thực phẩm đóng gói, hay sản phẩm đã qua chế biến với danh sách dài các thành phần, hầu hết đều không tự nhiên. Các thành phần được liệt kê trên nhãn thực phẩm chủ yếu phải là thực phẩm mà bạn có thể nhận ra, chẳng hạn như yến mạch làm từ ngũ cốc nguyên hạt, táo khô, hạt lanh và quế. Hạn chế các thành phần mà bạn không thể xác định được, chẳng hạn như: sáp carnauba, lecithin đậu nành và hương liệu nhân tạo.</li><li>Cắt giảm thức ăn có thêm muối, đường hoặc chất béo.</li><li>Tránh các loại thực phẩm bị thay đổi cấu trúc nhiều so với dạng tự nhiên, chẳng hạn như: nước ép táo thay vì táo nguyên quả, cốm gà so với ức gà tươi hoặc khoai tây chiên thay vì rau tươi.</li><li>Đôi khi quá trình chế biến có thể là một điều tốt cho thực phẩm, chẳng hạn như thanh trùng để làm cho trứng và các sản phẩm từ sữa trở nên an toàn khi tiêu thụ. Ngoài ra, trái cây và rau quả đông lạnh cũng được vì chúng được chế biến tối thiểu và đôi khi có thể chứa nhiều chất dinh dưỡng hơn các loại tươi vì chúng được cấp đông chuẩn.</li><li>Chuẩn bị và ăn nhiều thức ăn hơn khi ăn ở nhà. Bắt đầu với các bữa ăn đơn giản để giúp bạn có thói quen, chẳng hạn như: sữa chua Hy Lạp và quả mọng tươi cho bữa sáng, hoặc gà tây nướng nguyên hạt và bọc bơ với lát ớt đỏ vào bữa trưa.</li></ul><h2>3. Các cách đơn giản để bắt đầu chế độ “eat clean”</h2><h3><strong>3.1. Ăn nhiều rau và trái cây</strong></h3><p style="margin-left:0px;">Rau và trái cây đều là thực phẩm rất tốt cho sức khỏe. Chúng chứa nhiều <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/vai-tro-cua-chat-xo-voi-co/"><strong>chất xơ</strong></a>, vitamin, khoáng chất và các hợp chất thực vật giúp kháng viêm và bảo vệ tế bào của bạn khỏi bị hư hại.</p><p style="margin-left:0px;">Trên thực tế, nhiều nghiên cứu quan sát lớn cho kết quả có mối liên quan giữa việc ăn nhiều trái cây và rau quả với việc giảm nguy cơ mắc các bệnh như <a href="https://www.vinmec.com/vi/ung-buou-xa-tri/thong-tin-suc-khoe/nhung-dieu-co-ban-can-biet-ve-ung-thu/"><strong>ung thư</strong></a> và bệnh liên quan đến tim mạch.</p><p style="margin-left:0px;">Ngoài ra, rau và trái cây tươi là lý tưởng thực hiện “eat clean”, vì hầu hết có thể được ăn sống ngay sau khi hái và rửa sạch. Đây có thể coi là chế độ ăn “eat clean” giảm cân.</p><p style="margin-left:0px;">Lựa chọn sản phẩm hữu cơ có thể giúp bạn thực hiện “eat clean” tốt nhất bằng cách giảm tiếp xúc với thuốc trừ sâu và có khả năng tăng cường sức khỏe của bạn.</p><h3><strong>3</strong>.<strong>2. Hạn chế thực phẩm chế biến sẵn</strong></h3><p style="margin-left:0px;">Thực phẩm đã qua chế biến trái ngược trực tiếp với lối sống lành mạnh và “eat clean”, vì chúng đã được biến đổi so với trạng thái tự nhiên.</p><p style="margin-left:0px;">Hầu hết các sản phẩm thực phẩm đã qua chế biến đã mất một số chất xơ và chất dinh dưỡng nhưng lại có thêm đường, hóa chất hoặc các thành phần khác. Hơn nữa, các sản phẩm thực phẩm đã qua chế biến có liên quan đến chứng viêm và tăng nguy cơ mắc bệnh tim.</p><p style="margin-left:0px;">Ngay cả khi các thành phần không lành mạnh không được thêm vào những sản phẩm thực phẩm này, thì chúng vẫn thiếu nhiều lợi ích mà thực phẩm nguyên chất mang lại.</p><h3><strong>3.3. Đọc nhãn sản phẩm thực phẩm</strong></h3><p style="margin-left:0px;">Mặc dù, “eat clean” dựa trên việc sử dụng thực phẩm tươi sống, nhưng có thể bao gồm một số loại thực phẩm đóng gói, chẳng hạn như rau đóng gói, các loại hạt và thịt.</p><p style="margin-left:0px;">Tuy nhiên, điều quan trọng là bạn phải đọc nhãn sản phẩm để đảm bảo không có bất kỳ chất bảo quản, đường bổ sung hoặc chất béo không lành mạnh nào.</p><h3><strong>3.4. Ngừng ăn carbs tinh chế</strong></h3><p style="margin-left:0px;"><a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/14-su-ve-carbs-co-ban-chua-biet/"><strong>Carbs</strong></a> tinh chế bao gồm các loại thực phẩm đã qua chế biến rất dễ ăn quá nhiều nhưng lại cung cấp ít giá trị dinh dưỡng. Nghiên cứu đã chỉ ra mối liên hệ giữa việc tiêu thụ carb tinh chế với chứng viêm, <a href="https://www.vinmec.com/tin-tuc/thong-tin-suc-khoe/dau-hieu-de-khang-insulin/"><strong>kháng insulin</strong></a>, <a href="https://www.vinmec.com/vi/benh/gan-nhiem-mo-3147/"><strong>gan nhiễm mỡ</strong></a> và béo phì.</p><p style="margin-left:0px;">Ngược lại, ngũ cốc nguyên hạt, cung cấp nhiều chất dinh dưỡng và chất xơ hơn, có thể làm giảm viêm và thúc đẩy sức khỏe đường ruột tốt hơn.</p><p style="margin-left:0px;">&nbsp;</p><p style="margin-left:0px;">Trong một nghiên cứu được tiến hành ở 2.834 người, những người tiêu thụ chủ yếu ngũ cốc nguyên hạt ít có nguy cơ bị mỡ bụng hơn những người tập trung vào ngũ cốc tinh chế.</p><p style="margin-left:0px;">Nếu bạn ăn ngũ cốc, hãy chọn loại ít qua quá trình chế biến nhất, chẳng hạn như bánh mì ngũ cốc nảy mầm và yến mạch cắt thép. Đồng thời, hạn chế các ngũ cốc chế biến sẵn, bánh mì trắng và các loại carbs tinh chế khác.</p><h3><strong>3.5. Tránh dầu thực vật</strong></h3><p style="margin-left:0px;">Dầu thực vật và bơ thực vật không đáp ứng các tiêu chí eat clean. Các nghiên cứu trên động vật và các tế bào cô lập cho thấy rằng nó làm tăng tình trạng viêm, có khả năng làm tăng nguy cơ tăng cân và bệnh tim .Mặc dù chất béo chuyển hóa nhân tạo đã bị cấm ở Hoa Kỳ và các quốc gia khác, một số loại bơ thực vật và bơ thực vật vẫn có thể chứa một lượng nhỏ.Mặc dù, eat clean không khuyến khích sử dụng tất cả các loại dầu thực vật, nhưng điều quan trọng là phải ăn một lượng vừa phải chất béo lành mạnh. Chúng bao gồm cá béo, các loại hạt và quả bơ.</p><p style="margin-left:0px;">&nbsp;</p><h3><strong>3.6. Tránh xa đường hoặc không thêm đường vào thực phẩm</strong></h3><p style="margin-left:0px;">Không thêm đường vào chế độ ăn nếu bạn đang cố gắng thực hiện chế độ eat clean. Tuy nhiên, đường bổ sung rất phổ biến và thậm chí còn được tìm thấy trong các loại thực phẩm không có vị ngọt đặc biệt, như nước sốt và gia vị.</p><p style="margin-left:0px;">Đường ăn và siro ngô đều có hàm lượng fructose cao. Các nghiên cứu tiến hành cho kết quả rằng hợp chất này có thể đóng một vai trò trong bệnh <a href="https://www.vinmec.com/tin-tuc/thong-tin-suc-khoe/suc-khoe-tong-quat/beo-phi-su-tiem-ung-thu/"><strong>béo phì</strong></a>, tiểu đường, gan nhiễm mỡ và ung thư, trong số các vấn đề sức khỏe khác.</p><p style="margin-left:0px;">Nếu bạn mắc bệnh <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/suc-khoe-tong-quat/tong-quan-ve-benh-dai-thao-duong/"><strong>đái tháo đường</strong></a>, hội chứng chuyển hóa hoặc các vấn đề sức khỏe tương tự, tốt nhất bạn nên tránh tất cả các dạng đường cô đặc, bao gồm cả những loại đường có nguồn gốc tự nhiên.</p><p style="margin-left:0px;">Để thực hiện eat clean, bạn hãy cố gắng tiêu thụ thực phẩm ở trạng thái tự nhiên, không có đường. Thêm vào đó, bạn nên tìm hiểu cách đánh giá vị ngọt của trái cây và hương vị tinh tế của các loại hạt và thực phẩm toàn phần khác.</p><h3><strong>3.7. Hạn chế uống rượu</strong></h3><p style="margin-left:0px;">Rượu sản phẩm của men vào ngũ cốc, trái cây hoặc rau nghiền và để hỗn hợp lên men. Uống một lượng vừa phải một số loại rượu có thể tăng cường sức khỏe tim mạch.</p><p style="margin-left:0px;">Tuy nhiên, uống rượu thường xuyên đã được chứng minh là có thể thúc đẩy quá trình viêm và có thể góp phần gây ra một số vấn đề y tế,như: bệnh gan, <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/cac-trieu-chung-roi-loan-tieu-hoa-dien-hinh/"><strong>rối loạn tiêu hóa</strong></a> và mỡ bụng dư thừa.</p><h3><strong>3.8. Thay thế rau trong công thức nấu ăn</strong></h3><p style="margin-left:0px;">Bạn có thể tăng cường sức khỏe bằng cách thay thế ngũ cốc tinh chế bằng rau trong công thức nấu ăn hàng ngày.</p><h3><strong>3.9. Tránh thức ăn nhẹ đóng gói</strong></h3><p style="margin-left:0px;">Bạn nên tránh xa các loại thực phẩm ăn nhanh đóng gói nếu bạn đang cố gắng “eat clean”.</p><p style="margin-left:0px;">Bánh quy giòn, bánh nướng xốp ... thường chứa ngũ cốc tinh chế, đường, dầu thực vật và các thành phần không lành mạnh khác.</p><h3><strong>3.10. Nước giải khát</strong></h3><p style="margin-left:0px;">Nước uống có thành phần tự nhiên và lành mạnh nhất. Thành phần không chứa chất phụ gia, đường, chất làm ngọt nhân tạo hoặc các thành phần đáng ngờ khác. Theo đó, đây là đồ uống sạch nhất mà bạn có thể uống.</p><p style="margin-left:0px;">Nước có thể giữ cho bạn đủ nước và cũng có thể giúp bạn đạt được cân nặng hợp lý. Đây có thể là chế độ ăn eat clean tăng cân.</p><p style="margin-left:0px;">Ngược lại, đồ uống có đường luôn thường liên quan đến bệnh đái tháo đường, béo phì... Hơn nữa, nước ép trái cây có hàm lượng đường cao cũng có thể gây ra nhiều vấn đề tương tự.</p><p style="margin-left:0px;">Cà phê và trà không chứa đường là những lựa chọn tốt và mang lại một số lợi ích cho sức khỏe, nhưng những người nhạy cảm với <a href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/suc-khoe-tong-quat/caffeine-la-gi-caffeine-tot-hay-xau-cho-suc-khoe/"><strong>caffeine</strong></a> có thể cần phải sử dụng lượng cho phép.<br>&nbsp;</p>',
  },
  {
    uuid: 2,
    read: true,
    type: TypeChat.INBOX,
    author: 'Khoi Tran',
    subject: 'Hello from KhoiTran',
    content: 'I just assign task for you. Please check at https:// and feedback for me.',
  },
  {
    uuid: 3,
    read: true,
    type: TypeChat.INBOX,
    author: 'Khoi Tran',
    subject: 'Lorem ipsum dolor sit amet',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 4,
    read: false,
    type: TypeChat.INBOX,
    author: 'Khoi Tran',
    subject: 'Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 5,
    read: false,
    type: TypeChat.INBOX,
    author: 'Khoi Tran',
    subject: 'Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 6,
    read: false,
    type: TypeChat.INBOX,
    author: 'Khoi Tran',
    subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 7,
    type: TypeChat.INBOX,
    read: true,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 8,
    read: true,
    type: TypeChat.INBOX,
    author: 'Khoi Tran',
    subject: 'Bibendum fermentum mi. Quisque in placerat lorem.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 9,
    type: TypeChat.INBOX,
    read: true,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.vLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.v Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 10,
    type: TypeChat.INBOX,
    read: true,
    author: 'Khoi Tran',
    subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    uuid: 11,
    type: TypeChat.INBOX,
    read: false,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 12,
    type: TypeChat.INBOX,
    read: true,
    author: 'Khoi Tran',
    subject: 'Bibendum fermentum mi. Quisque in placerat lorem.',
    content:
      'Bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 13,
    type: TypeChat.INBOX,
    read: false,
    author: 'Khoi Tran',
    subject:
      'Bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 14,
    type: TypeChat.INBOX,
    read: true,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 15,
    read: true,
    author: 'Khoi Tran',
    type: TypeChat.INBOX,
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 16,
    type: TypeChat.INBOX,
    read: true,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 17,
    type: TypeChat.INBOX,
    read: false,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 18,
    type: TypeChat.INBOX,
    read: false,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 19,
    type: TypeChat.INBOX,
    read: false,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 20,
    type: TypeChat.INBOX,
    read: false,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
  {
    uuid: 21,
    type: TypeChat.INBOX,
    read: false,
    author: 'Khoi Tran',
    subject:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus libero nibh, suscipit et neque quis, bibendum fermentum mi. Quisque in placerat lorem. Cras mattis massa sed mi porta, nec pellentesque risus feugiat. Sed non lectus sodales arcu ultrices feugiat. Etiam nec scelerisque enim. Ut at placerat lorem. Maecenas id orci at dolor vulputate viverra. Sed ultricies dignissim lorem quis sodales. Cras vitae scelerisque ex.',
  },
];

const datawithDay = dataInbox?.map((item) => ({
  ...item,
  time: '2023-05-30T03:29:57+00:00',
  address: 'khoi.tran@techupcorp.com',
  from_user: {
    uuid: 311,
    username: 'khoi.tran@techupcorp.com',
    first_name: 'Khoi',
    last_name: 'Tran',
    email: 'khoi.tran@techupcorp.com',
    roles: [
      {
        uuid: 1,
        name: 'User',
      },
    ],
  },
}));

const getInbox = () => {
  return new Promise<MailType[]>((resolve) => {
    setTimeout(() => {
      resolve(datawithDay);
    }, 1000);
  });
};

const getMailById = (id: number) => {
  const data = datawithDay?.find((item) => item.uuid === id);
  return data;
};

export { getInbox, getMailById };
