//package nmhs.backend.service;
//
//import jakarta.transaction.Transactional;
//import nmhs.backend.domain.Member;
//import nmhs.backend.repository.MemberRepository;
//import nmhs.backend.repository.MemoryMemberRepository;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//
//@SpringBootTest
//@Transactional
//class MemberServiceIntegrationTest {
//
//    @Autowired MemberService memberService;
//    @Autowired MemberRepository memberRepository;
//
//    @Test
//    void join() {
//        // given
//        Member member = new Member();
//        member.setName("spring3");
//
//        // when
//        Long saveId = memberService.join(member);
//
//        // then
//        Member findMember = memberService.findOne(saveId).get();
//        assertThat(member.getName()).isEqualTo(findMember.getName());
//    }
//
//    @Test
//    public void duplicateMemberException() {
//        // given
//        Member member1 = new Member();
//        member1.setName("spring");
//
//        Member member2 = new Member();
//        member2.setName("spring");
//
//        // when
//        memberService.join(member1);
//        IllegalStateException e = assertThrows(IllegalStateException.class, () -> memberService.join(member2));
//
//        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
//    }
//
//    @Test
//    void findMembers() {
//        // given
//
//        // when
//
//        // then
//    }
//
//    @Test
//    void findOne() {
//        // given
//
//        // when
//
//        // then
//    }
//}