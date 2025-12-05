
public class ProjectData {

    private String projectName;
    private String projectPhase;
    private int totalMembers;

    public ProjectData(String projectName, String projectPhase, int totalMembers) {
        this.projectName = projectName;
        this.projectPhase = projectPhase;
        this.totalMembers = totalMembers;
    }

    public String getProjectName() {
        return projectName;
    }

    public String getProjectPhase() {
        return projectPhase;
    }

    public int getTotalMembers() {
        return totalMembers;
    }

    public void printProjectSummary() {
        System.out.println("--- Tổng quan Dự án ---");
        System.out.println("Tên dự án: " + projectName);
        System.out.println("Giai đoạn: " + projectPhase);
        System.out.println("Số thành viên: " + totalMembers);
    }

    public static void main(String[] args) {
        ProjectData nhimTapGieo = new ProjectData("Nhím Tập Gieo", "Mùa 2: STEM", 26);
        nhimTapGieo.printProjectSummary();
    }
}
