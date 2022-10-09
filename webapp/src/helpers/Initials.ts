export class Initials {
  constructor(private name: string) {}

  private hasTwoOrMoreWords(): boolean {
    return this.name.split(' ').length > 1;
  }

  private getFirstChars(): string {
    return this.name
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('');
  }

  private toUpperCase(name: string): string {
    return name.toUpperCase();
  }

  public getInitials(): string {
    return this.toUpperCase(
      this.hasTwoOrMoreWords() ? this.getFirstChars() : this.name.slice(0, 2),
    );
  }
}
